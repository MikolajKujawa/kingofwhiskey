import React from 'react';
import Logo from '../../assets/images/logofull.png';
import LogoBlack from '../../assets/images/logofull_black.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <a href="/"><img src={props.black ? LogoBlack : Logo} alt="MyBurger" /></a>
    </div>
);

export default logo;