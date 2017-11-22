import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import { GC_USER_ID } from '../constants';

const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
    createLink(
      description: $description,
      url: $url,
      postedById: $postedById
    ) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`;

class CreateLink extends Component {
  state = {
    description: '',
    url:         ''
  };

  createLink = async () => {
    const { history, createLinkMutation } = this.props;
    const { description, url } = this.state;

    const postedById = localStorage.getItem(GC_USER_ID);

    if (!postedById) {
      console.error('Not logged in!');
      return;
    }

    await createLinkMutation({ variables: { description, url, postedById }});
    history.push('/');
  }

  render() {
    const { description, url } = this.state;

    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            type='text'
            value={description}
            onChange={(e) => this.setState({ description: e.target.value })}
            placeholder='A description for the link'
          />
          <input
            className='mb2'
            type='text'
            value={url}
            onChange={(e) => this.setState({ url: e.target.value })}
            placeholder='The URL for the link'
          />
          <button onClick={() => this.createLink()}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default graphql(
  CREATE_LINK_MUTATION,
  { name: 'createLinkMutation' }
)(CreateLink);
