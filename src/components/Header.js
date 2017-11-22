import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import { withRouter } from 'react-router';

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';

class Header extends Component {
  handleLogoutClick = () => {
    localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.props.history.push('/');
  }

  render() {
    const userId = localStorage.getItem(GC_USER_ID);

    return (
      <div className='flex pa1 justify-between nowrap orange'>
        <div className='flex flex-fixed black'>
          <div className='fw7 mr1'>Hacker News</div>
          <Link
            className='ml1 no-underline black'
            to='/'
          >
            new
          </Link>

          { userId &&
            <div className="flex">
              <div className='ml1'>|</div>
              <Link
                className='ml1 no-underline black'
                to='/create'
              >
                submit
              </Link>
            </div>
          }
        </div>

        <div className="flex flex-fixed">
          {userId ?
            <div
              className="ml1 pointer black"
              onClick={this.handleLogoutClick}
            >
              logout
            </div>
            :
            <Link
              className="ml1 no-underline black"
              to="/login"
            >
              login
            </Link>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
