import React from 'react'
import classes from './About.css';
import GitHub from '../../../../assets/images/github.png';

import Logo from '../../../Logo/Logo';
import Window from '../Window';

const about = (props) => (
    <Window
        show={props.show}
        modalToggle={props.modalToggle}>
        <div className={classes.Content}>
            <div className={classes.Logo}>
                <Logo black />
            </div>

            <h2>What is - KingOfWhiskey?</h2>

            <p>
                This is a web application where whisky fans can check
                yourself knowledge about whisky names, types and countries
                based on whisky images
            </p>

            <a className={classes.Github}
               target="_blank"
               rel="noopener noreferrer"
               href="https://github.com/mateuszpijanowski/kingofwhiskey">
                    <img alt="GitHub" src={GitHub} />
            </a>

            <p className={classes.Copy}>
                &copy; by Mateusz Pijanowski
            </p>
        </div>
    </Window>

);

export default about;