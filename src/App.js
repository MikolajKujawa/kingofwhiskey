import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';

/*
  TODO:
    1. Add random fetch
    2. viewCorrectDataHandler
    3. addWhiskyHandler
    4. Create Modal for Add Whisky
    8. Add routing
    9. Create spinner and add then to axios fetch
    11. Add setting system
    12. Add About page
 */

class App extends Component {
  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

export default App;
