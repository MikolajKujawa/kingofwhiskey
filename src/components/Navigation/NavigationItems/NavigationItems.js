import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Play</NavigationItem>
        <NavigationItem link="/addWhisky">Add Whisky</NavigationItem>
        <NavigationItem link="/editWhisky">Edit Whisky</NavigationItem>
        <NavigationItem link="#" toggleAbout={props.toggleAbout}>About</NavigationItem>
    </ul>
);

export default navigationItems;