import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Play</NavigationItem>
        <NavigationItem link="/">Add Whisky</NavigationItem>
        <NavigationItem link="/">About</NavigationItem>
    </ul>
);

export default navigationItems;