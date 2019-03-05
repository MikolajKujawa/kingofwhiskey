import React, { Component, Suspense } from 'react';
import classes from './Layout.css';
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import About from '../../components/UI/Window/About/About';
import Window from "../../components/UI/Window/Window";

// Lazy containers
const GameLogic = React.lazy(() => import('../GameLogic/GameLogic'));
const NewWhisky = React.lazy(() => import('../NewWhisky/NewWhisky'));
const EditWhisky = React.lazy(() => import('../EditWhisky/EditWhisky'));
const Auth = React.lazy(() => import('../Auth/Auth'));
const Logout = React.lazy(() => import('../Auth/Logout/Logout'));

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showModal: false
    };

    componentDidMount() {
        this.props.onAuthCheckState();
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    modalToggleHandler = (modal) => {
        if (modal === true) {
            this.props.history.replace('/');
        } else {
            this.setState((prevState) => {
                return {
                    showModal: !prevState.showModal,
                    showSideDrawer: !prevState.showSideDrawer
                };
            })
        }
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
                modalToggle={() => this.modalToggleHandler(true)}>
                <div style={{paddingBottom: '25px', textAlign: 'center', margin: 'auto'}}>
                    <h2>Error 404</h2>This page does not exist!
                </div>
            </Window>
        );

        return (
            <React.Fragment>
                <Toolbar
                    isAuth={this.props.isAuth}
                    isAdmin={this.props.isAdmin}
                    activeAbout={this.state.showModal}
                    toggleAbout={this.modalToggleHandler}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuth}
                    isAdmin={this.props.isAdmin}
                    activeAbout={this.state.showModal}
                    toggleAbout={this.modalToggleHandler}
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer} />
                { this.state.showModal ? aboutComponent : null }
                <main className={classes.Content}>
                    <Switch>
                        { this.props.isAuth
                        ? <Route path="/addWhisky" render={() =>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <NewWhisky />
                                </Suspense>} />
                        : null }

                        { this.props.isAuth
                        ? <Route path="/editWhisky" render={() =>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <EditWhisky />
                                </Suspense>} />
                        : null }

                        { this.props.isAuth
                        ? <Route path="/logout" render={() =>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Logout />
                                </Suspense>} />
                        : <Route path="/auth" render={() =>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Auth />
                                </Suspense>} /> }

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

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        isAdmin: state.auth.isAdmin !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
