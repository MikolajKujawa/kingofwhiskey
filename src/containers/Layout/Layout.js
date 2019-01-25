import React, { Component } from 'react';

import GameLogic from '../GameLogic/GameLogic';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import NewWhisky from '../NewWhisky/NewWhisky';

class Layout extends Component {

    render() {
        return (
            <div>
                <Toolbar />
                <span>SideDrawer</span>
                <main>
                    <GameLogic />
                </main>
            </div>
        );
    };
};

export default Layout;