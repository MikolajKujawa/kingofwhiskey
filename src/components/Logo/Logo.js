import React from 'react';
import Logo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <a href="/"><img src={Logo} alt="MyBurger" /></a>
    </div>
);

export default logo;