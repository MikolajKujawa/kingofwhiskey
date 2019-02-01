import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle
            toggleAbout={props.toggleAbout}
            activeAbout={props.activeAbout}
            clicked={props.drawerToggleClicked} />
        <nav className={classes.OnlyDesktop}>
            <NavigationItems
                toggleAbout={props.toggleAbout}
                activeAbout={props.activeAbout} />
        </nav>
        <div className={classes.Logo}>
            <Logo />
        </div>
    </header>
);

export default toolbar;