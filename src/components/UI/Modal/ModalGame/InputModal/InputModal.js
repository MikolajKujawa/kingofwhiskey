import React from 'react';
import '../../InputModal.scss';

const inputModal = (props) => {
    const input = [
        <input
            className={props.correct ? "Correct" : ''}
            value={props.correct ? props.whisky : props.value}
            type="search"
            name={props.name}
            placeholder={props.inputName}
            onChange={props.change}/>,
        <button
            type="button"
            className={props.correct ? "Correct" : null}
            disabled={props.correct}
            name={props.name}
            onClick={props.viewHandler}>Correct
        </button>
    ];

    return (
        <React.Fragment>
            <div className="container">
                <form className="flex-form">
                    {input}
                </form>
            </div>
        </React.Fragment>
    );
};

export default inputModal;