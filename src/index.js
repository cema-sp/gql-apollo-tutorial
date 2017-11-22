import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { GC_AUTH_TOKEN } from './constants';

import './styles/index.css';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj9g4tepn5fau0129i832ku8j',
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      const token = localStorage.getItem(GC_AUTH_TOKEN);

      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
    }
  }
]);

const client = new ApolloClient({ networkInterface });

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={ client }>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
