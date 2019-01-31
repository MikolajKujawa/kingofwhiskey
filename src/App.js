import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';

/*
  TODO:
    1. Add About page
    2. 404 error page
    3. Error modal
    4. Optimization code
    5. Deploy all to server
 */

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout />
      </React.Fragment>
    );
  }
}

export default App;
