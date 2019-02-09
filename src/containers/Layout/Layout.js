import React, { Component } from 'react';
import GameLogic from '../GameLogic/GameLogic';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';
import { Route, Switch } from "react-router-dom";
import NewWhisky from "../NewWhisky/NewWhisky";
import EditWhisky from "../EditWhisky/EditWhisky";
import About from '../../components/UI/Window/About/About';
import Window from "../../components/UI/Window/Window";

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showModal: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    modalToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showModal: !prevState.showModal,
                showSideDrawer: !prevState.showSideDrawer };
        })
    };

    render() {
        const aboutComponent = (
            <About
                show={this.state.showModal}
                modalToggle={this.modalToggleHandler} />
        );

        const notFoundError = (
            <Window
                show={!this.state.showModal}
                modalToggle={null}>
                <div style={{paddingBottom: '25px', textAlign: 'center', margin: 'auto'}}>
                    <h2>Error 404</h2>This page does not exist!
                </div>
            </Window>
        );

        return (
            <React.Fragment>
                <Toolbar
                    activeAbout={this.state.showModal}
                    toggleAbout={this.modalToggleHandler}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    activeAbout={this.state.showModal}
                    toggleAbout={this.modalToggleHandler}
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer} />
                { this.state.showModal ? aboutComponent : null }
                <main className={classes.Content}>
                    <Switch>
                        <Route path="/addWhisky" component={NewWhisky} />
                        <Route path="/editWhisky" component={EditWhisky} />
                        <Route path="/" exact component={GameLogic} />
                        <Route render={() => notFoundError} />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;