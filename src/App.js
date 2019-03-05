import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';

/*
  TODO:
      1. Authorization system [1.3.0]
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
