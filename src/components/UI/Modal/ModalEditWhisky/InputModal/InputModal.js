import React from 'react';
import '../../InputModal.scss';

const inputModal = (props) => {
    const input = [
        <input
            className={props.changeValue ? "Correct" : ''}
            id={props.id}
            value={props.value}
            type="search"
            name={props.name}
            placeholder={props.inputName}
            onChange={props.change}/>,
        <button
            type="button"
            className={props.changeValue ? "Change" : null}
            name={props.name}
            id={props.id}
            onClick={props.edit}>Edit
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