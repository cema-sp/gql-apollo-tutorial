import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from '../logo.svg';
import Header from './Header';
import CreateLink from './CreateLink';
import LinkList from './LinkList';
import Login from './Login';

import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/create' component={CreateLink} />
            <Route exact path='/' component={LinkList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
