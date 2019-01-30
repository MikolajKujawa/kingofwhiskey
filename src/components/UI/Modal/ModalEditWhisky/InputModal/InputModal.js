import React from 'react';
import '../../InputModal.scss';

const inputModal = (props) => {
    let input;
    let button;
    input = (
        <input
            className={props.correct ? "Correct" : ''}
            id={props.id}
            value={props.value}
            type="search"
            name={props.name}
            placeholder={props.inputName}
            onChange={props.change}/>
    );

    button = (
        <button
            type="button"
            className={props.correct ? "Correct" : null}
            disabled={props.correct}
            name={props.name}
            id={props.id}
            onClick={props.edit}>Edit
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