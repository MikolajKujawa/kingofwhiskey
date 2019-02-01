import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { withRouter } from 'react-router-dom';

const navigationItems = (props) => {

    const activePage = (path) => {
        return props.location.pathname === path;
    };

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active={activePage("/")}>Play</NavigationItem>
            <NavigationItem link="/addWhisky" active={activePage("/addWhisky")}>Add Whisky</NavigationItem>
            <NavigationItem link="/editWhisky" active={activePage("/editWhisky")}>Edit Whisky</NavigationItem>
            <NavigationItem link={null} active={props.activeAbout} toggleAbout={props.toggleAbout}>About</NavigationItem>
        </ul>
    );
};

export default withRouter(navigationItems);