import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';

/*
  TODO:
    2. newWhiskyHandler
    5. Toolbar and SideDrawer
    6. CSS Module
    7. Add style
    8. Add routing
    9. Create spinner and add then to axios fetch
    10. Add About page
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
