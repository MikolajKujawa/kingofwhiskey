import React from 'react';
import classes from './NavigationItems.css';
import { withRouter } from "react-router-dom";

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" closed={props.closed}>Play</NavigationItem>

        { props.isAuth
            ? <NavigationItem link="/addWhisky" closed={props.closed}>Add Whisky</NavigationItem>
            : null }

        { props.isAuth
        ? <NavigationItem link="/editWhisky" closed={props.closed}>{ props.isAdmin ? "Edit Whisky" : "Whisky List" }</NavigationItem>
        : null }

        { props.isAuth
            ? <NavigationItem link="/logout" closed={props.closed}>Logout</NavigationItem>
            : <NavigationItem link="/auth" closed={props.closed}>Authentication</NavigationItem> }

        <NavigationItem link={props.history.location.search + "#"} closed={props.closed} toggleAbout={props.toggleAbout}>About</NavigationItem>
    </ul>
);

export default withRouter(navigationItems);
