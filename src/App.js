import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';

/*
  TODO:
      1. Add Redux
        1.1. Add Redux to newWhisky
        1.2. Add Redux to editWhisky
        1.3 Add utility
        1.4 Clear Redux code
      2. Authorization system
      *Optimization code
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
