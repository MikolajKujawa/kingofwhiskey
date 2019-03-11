import React, { Component } from 'react';
import classes from './Layout.css';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import GameLogic from '../GameLogic/GameLogic';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import About from '../../components/UI/Window/About/About';
import Window from "../../components/UI/Window/Window";
import { dynamicSuspense } from "../../shared/utility";

// Lazy containers
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
                    showModal: !prevState.showModal
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

        const notFoundError = () => {
            if (this.props.history.location.pathname === "/auth") {
                return <Redirect to="/" />
            }

            return (
                <Window
                    show={!this.state.showModal}
                    modalToggle={() => this.modalToggleHandler(true)}>
                    <div style={{paddingBottom: '25px', textAlign: 'center', margin: 'auto'}}>
                        <h2>Error 404</h2>This page does not exist!
                    </div>
                </Window>
            )
        };

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
                    closed={this.sideDrawerToggleHandler}
                    open={this.state.showSideDrawer} />
                { this.state.showModal ? aboutComponent : null }

                <main className={classes.Content}>
                    <Switch>
                        { this.props.isAuth
                        ? <Route path="/addWhisky" render={() => dynamicSuspense(<NewWhisky />)} />
                        : null }

                        { this.props.isAuth
                        ? <Route path="/editWhisky" render={() => dynamicSuspense(<EditWhisky />)} />
                        : null }

                        { this.props.isAuth
                        ? <Route path="/logout" render={() => dynamicSuspense(<Logout />)} />
                        : <Route path="/auth" render={() => dynamicSuspense(<Auth />)} /> }

                        <Route path="/" exact component={ GameLogic } />
                        <Route render={() => notFoundError()} />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        isAdmin: state.auth.isAdmin,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
