import React from 'react';
import classes from '../../InputModal.css';

const inputModal = (props) => {
    const input = [
        <input
            key={props.whisky+"input"}
            className={props.correct ? classes.Correct : null}
            value={props.correct ? props.whisky : props.value}
            type="search"
            name={props.name}
            placeholder={props.inputName}
            onChange={props.change}/>,
        <button
            key={props.whisky+"button"}
            type="button"
            className={props.correct ? classes.Correct : null}
            disabled={props.correct}
            name={props.name}
            onClick={props.viewHandler}>Correct
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