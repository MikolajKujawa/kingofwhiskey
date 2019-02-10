import React from 'react';
import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" closed={props.closed}>Play</NavigationItem>
        <NavigationItem link="/addWhisky" closed={props.closed}>Add Whisky</NavigationItem>
        <NavigationItem link="/editWhisky" closed={props.closed}>Edit Whisky</NavigationItem>
        <NavigationItem link="#" toggleAbout={props.toggleAbout}>About</NavigationItem>
    </ul>
);

export default navigationItems;