import React from 'react';
import classes from "../../InputModal.css";

const inputModal = (props) => {
    const input = [
        <input
            key={props.whisky+"input"}
            className={props.changeValue ? "Correct" : ''}
            id={props.id}
            value={props.value}
            type="search"
            name={props.name}
            placeholder={props.inputName}
            onChange={props.change}/>,
        <button
            key={props.whisky+"button"}
            type="button"
            className={props.changeValue ? "Change" : null}
            name={props.name}
            id={props.id}
            onClick={props.edit}>Edit
        </button>
    ];


    return (
        <React.Fragment>
            <div className={classes.container}>
                <form className={classes["flex-form"]}>
                    {input}
                </form>
            </div>
        </React.Fragment>
    );
};

export default inputModal;