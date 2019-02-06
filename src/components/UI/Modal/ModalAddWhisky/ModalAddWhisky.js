import React from 'react';
import classes from '../Modal.css';
import InputModal from './InputModal/InputModal';
import Spinner from '../../Spinner/Spinner';

const Modal = (props) => {
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let Img;
    let inputs;

    if (props.state.loadingData) {
        Img=null;
        inputs=<Spinner />;
    } else {
        Img=null;
        if (props.state.confirm.img) {
            Img = (
                <div className={classes.Img}>
                    <p><img src={props.state.whisky.img} alt="whisky_img"/></p>
                </div>
            );
        }

        if (props.state.loading) {
            inputs = <Spinner />
        } else {
            inputs = Object.keys(props.state.whisky)
                .map(key => {
                    return (
                        <InputModal
                            key={key}
                            correct={props.state.confirm[key]}
                            name={key} inputName={capitalize(key)}
                            updateData={props.updateData}
                            confirmData={props.confirmData} />
                    );
                });
        }
    }

    return (
        <React.Fragment>
            <div className={classes.Game}>
                {Img}
                <div>
                    {inputs}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;