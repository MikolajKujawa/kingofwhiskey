import React, { Component, Suspense } from 'react';
import classes from './Layout.css';
import { Route, Switch } from "react-router-dom";

// Components
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import About from '../../components/UI/Window/About/About';
import Window from "../../components/UI/Window/Window";

// Lazy containers
const GameLogic = React.lazy(() => import('../GameLogic/GameLogic'));
const NewWhisky = React.lazy(() => import('../NewWhisky/NewWhisky'));
const EditWhisky = React.lazy(() => import('../EditWhisky/EditWhisky'));

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
                        <Route path="/addWhisky" render={() =>
                            <Suspense fallback={<div>Loading...</div>}>
                                <NewWhisky />
                            </Suspense>} />
                        <Route path="/editWhisky" render={() =>
                            <Suspense fallback={<div>Loading...</div>}>
                                <EditWhisky />
                            </Suspense>} />
                        <Route path="/" exact render={() =>
                            <Suspense fallback={<div>Loading...</div>}>
                                <GameLogic />
                            </Suspense>} />
                        <Route render={() => notFoundError} />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;
