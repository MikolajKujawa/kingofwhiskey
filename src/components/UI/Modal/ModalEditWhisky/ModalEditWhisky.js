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
        Img = <Spinner />;

        inputs = Object.keys(props.state.whisky)
            .map(key => {
                Img = (
                    <div className={classes.Img}>
                        <p><img src={props.state.whisky[key]['img']} alt="whisky_img"/></p>
                    </div>
                );
                return Object.keys((props.state.whisky[key]))
                    .map(key2 => {
                        return (
                            <InputModal
                                key={key+key2}
                                value={props.state.value[key][key2]}
                                name={key2} inputName={capitalize(key2)}
                                id={key}
                                change={props.change}
                                edit={props.edit} />
                        );
                    })
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

/*
                return (
                    <InputModal
                        key={key}
                        value={props.state.value[key]}
                        whisky={props.state.whisky[key]}
                        name={key} inputName={capitalize}
                        change={props.change}
                        edit={props.edit} />
                );
 */