import React, { Component } from 'react';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';
import { gql, graphql, compose } from 'react-apollo';

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(
      email: {
        email: $email,
        password: $password
      }
    ) {
      token
      user {
        id
      }
    }
  }
`;

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(
      email: {
        email: $email,
        password: $password
      }
    ) {
      token
      user {
        id
      }
    }
  }
`;

class Login extends Component {
  state = {
    login:     true,
    email:     '',
    password:  '',
    name:      '',
  }

  confirm = async () => {
    const { history, signinUserMutation, createUserMutation } = this.props;
    const { login, name, email, password } = this.state;

    let result;
    if (login) {
      result = await signinUserMutation({
        variables: { email, password }
      });
    } else {
      result = await createUserMutation({
        variables: { name, email, password }
      });
    }

    const { user, token } = result.data.signinUser;
    this.saveUserData(user.id, token);

    history.push('/');
  }

  saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
  }

  render() {
    const { login, name, email, password } = this.state;

    return (
      <div>
        <h4 className="mv3">
          {login ? 'Login' : 'Sign Up'}
        </h4>
        <div className="flex flex-column">
          {/* Name */}
          {!login &&
            <input
              value={name}
              onChange={(e) => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          }

          {/* Email */}
          <input
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type="email"
            placeholder="Your email address"
          />

          {/* Password */}
          <input
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Your password"
          />
        </div>

        <div className="flex m3">
          <div
            className="pointer mr2 button"
            onClick={() => this.confirm()}
          >
            {login ? 'login' : 'create account'}
          </div>

          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(Login);
