import React, { Component } from 'react';

import GameLogic from '../GameLogic/GameLogic';

class Layout extends Component {

    render() {
        return (
            <div>
                <span>Toolbar</span>
                <span>SideDrawer</span>
                <main>
                    <GameLogic />
                </main>
            </div>
        );
    };
};

export default Layout;