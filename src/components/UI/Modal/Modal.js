import React from 'react';
import classes from './Modal.css';
import InputModal from './InputModal/InputModal';
import Spinner from '../Spinner/Spinner';

const Modal = (props) => {
    let Img = (
        <div className={classes.Img}>
            <p><img src={props.whisky.img} alt="whisky_img"/></p>
        </div>
    );

    if (props.loading) {
        Img = <Spinner />
    }

    return (
        <React.Fragment>

            <div className={classes.Game}>
                {Img}

                <div className={classes.Input}>
                    <InputModal
                        correct={props.correct.name}
                        value={props.value.name}
                        whisky={props.whisky.name}
                        viewHandler={props.viewHandler}
                        name="name" inputName="Whisky Name"
                        change={props.change}/>
                    <InputModal
                        correct={props.correct.country}
                        value={props.value.country}
                        whisky={props.whisky.country}
                        viewHandler={props.viewHandler}
                        name="country" inputName="Country"
                        change={props.change}/>
                    <InputModal
                        correct={props.correct.region}
                        value={props.value.region}
                        whisky={props.whisky.region}
                        viewHandler={props.viewHandler}
                        name="region" inputName="Region"
                        change={props.change}/>
                    <InputModal
                        correct={props.correct.capacity}
                        value={props.value.capacity}
                        whisky={props.whisky.capacity}
                        viewHandler={props.viewHandler}
                        name="capacity" inputName="Capacity (l)"
                        change={props.change}/>
                    <InputModal
                        correct={props.correct.years}
                        value={props.value.years}
                        whisky={props.whisky.years}
                        viewHandler={props.viewHandler}
                        name="years" inputName="Years"
                        change={props.change}/>
                </div>
            </div>

        </React.Fragment>
    );
};

export default Modal;