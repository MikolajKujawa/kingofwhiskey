import React from 'react';
import classes from "../../InputModal.css";

const inputModal = (props) => {
    const input = [
        <input
            key={props.whisky+"input"}
            className={props.correct ? "Correct" : ''}
            type="search"
            name={props.name}
            placeholder={props.inputName}
            onChange={props.updateData} />,
        <button
            key={props.whisky+"button"}
            type="button"
            className={props.correct ? "Correct" : null}
            disabled={props.correct}
            name={props.name}
            onClick={props.confirmData}>Confirm
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