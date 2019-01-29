import React, { Component } from 'react';
import GameLogic from '../GameLogic/GameLogic';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';
import { Route } from "react-router-dom";
import NewWhisky from "../NewWhisky/NewWhisky";

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        return (
            <React.Fragment>
                <header>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                    <SideDrawer
                        closed={this.sideDrawerClosedHandler}
                        open={this.state.showSideDrawer} />
                </header>
                <main className={classes.Content}>
                    <Route path="/" exact component={GameLogic} />
                    <Route path="/addWhisky" component={NewWhisky} />
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;