import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';

/*
  TODO:
      1. Add Redux (1.2.0 update)
        1.1 Fix change page in EditWhisky
        1.2 Clear and check Redux code
        1.3 Update README
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
