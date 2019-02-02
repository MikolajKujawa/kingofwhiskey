import React from 'react';
import classes from './Window.css';
import Backdrop from '../Backdrop/Backdrop';

const Window = (props) => {
    let attachedClasses = [classes.Modal, classes.Close];

    if (props.show) {
        attachedClasses = [classes.Modal, classes.Open];
    }

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalToggle}/>
            <div className={ attachedClasses.join(' ')}
                 style={{
                     position: props.show ? 'translateY(0)' : 'translateY(-100vh)'
                 }}>
                {props.children}
            </div>
        </React.Fragment>
    )
};

export default Window;