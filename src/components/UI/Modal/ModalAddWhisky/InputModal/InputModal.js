import React from 'react';
import '../../InputModal.scss';

const inputModal = (props) => {
    let input;
    let button;

    input = (
        <input
            className={props.correct ? "Correct" : ''}
            type="search"
            name={props.name}
            placeholder={props.inputName}
            onChange={props.updateData} />
    );

    button = (
        <button
            type="button"
            className={props.correct ? "Correct" : null}
            disabled={props.correct}
            name={props.name}
            onClick={props.confirmData}>Confirm
        </button>
    );


    return (
        <React.Fragment>

            <div className="container">
                <form className="flex-form">
                    {input}
                    {button}
                </form>
            </div>

        </React.Fragment>
    );
};

export default inputModal;