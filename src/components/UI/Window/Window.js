import React from 'react';
import classes from './Window.css';
import './Window.css';
import CSSTransition from 'react-transition-group/CSSTransition';

import Backdrop from '../Backdrop/Backdrop';

const window = (props) => {
    const animationTiming = {
        enter: 400,
        exit: 600
    };

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalToggle}/>
            <CSSTransition
                in={props.show}
                timeout={animationTiming}
                mountOnEnter
                unmountOnExit
                classNames={{
                    enterActive: classes["fade-enter-active"],
                    exitActive: classes["fade-exit-active"]
                }}>
                <div className={ classes.Modal }>
                    {props.children}
                </div>
            </CSSTransition>
        </React.Fragment>
    )
};

export default window;