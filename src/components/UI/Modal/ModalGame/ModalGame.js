import React from 'react';
import classes from '../Modal.css';
import InputModal from './InputModal/InputModal';
import Spinner from '../../Spinner/Spinner';

const ModalGame = (props) => {
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let Img;
    let inputs;

    if (props.state.loadingData) {
        Img=null;
        inputs=<Spinner />;
    } else {
        Img = (
            <div className={classes.Img}>
                <p><img onClick={props.next} src={props.state.whisky.img} alt="whisky_img"/></p>
            </div>
        );

        if (props.state.loading) {
            Img = <Spinner />
        }

        inputs = Object.keys(props.state.value)
            .map(key => {
                return (
                    <InputModal
                        key={key}
                        help={props.state.helpInfo[key]}
                        correct={props.state.correct[key]}
                        value={props.state.value[key]}
                        whisky={props.state.whisky[key]}
                        name={key} inputName={capitalize(key)}
                        change={props.change}
                        viewHandler={props.viewHandler} />
                );
            });
    }

    return (
        <React.Fragment>
            <div className={classes.Game}>
                {Img}
                <div className={classes.Input}>
                    {inputs}
                </div>
            </div>
        </React.Fragment>
    );
};

export default ModalGame;