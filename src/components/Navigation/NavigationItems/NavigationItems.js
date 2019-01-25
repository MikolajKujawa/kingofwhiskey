import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul>
        <NavigationItem link="/">King</NavigationItem>
        <NavigationItem link="/">Add Whisky</NavigationItem>
        <NavigationItem link="/">About</NavigationItem>
    </ul>
);

export default navigationItems;