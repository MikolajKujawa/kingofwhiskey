import React from 'react';
import classes from './Window.css';
import Backdrop from '../Backdrop/Backdrop';

const Window = (props) => {
    let attachedClasses = [classes.Modal, classes.Close];

    if (props.show) {
        attachedClasses = [classes.Modal];
    }

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalToggle}/>
            <div className={ attachedClasses.join(' ') }>
                {props.children}
            </div>
        </React.Fragment>
    )
};

export default Window;