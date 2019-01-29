import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';

/*
  TODO:
    1. Upgrade InputModal code
    2. Add Edit Whisky (list, edit and remove whiskey)
    2. Add setting system
    3. Add About page
    4. Upgrade defaultValue
    5. 404 error page
    6. Error modal
    7. Optimization code
    8. Deploy all to server
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
