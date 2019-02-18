import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';

/*
  TODO:
      1. Add Redux
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
