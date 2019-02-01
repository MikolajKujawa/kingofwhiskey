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
                     transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                     opacity: props.show ? '1' : '0'
                 }}>
                {props.children}
            </div>
        </React.Fragment>
    )
};

export default Window;