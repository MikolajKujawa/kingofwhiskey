import React from 'react';
import classes from './Modal.css';

const Modal = (props) => (
    <React.Fragment>

        <div className={classes.Game}>
            <div className={classes.Img}>
                <p><img src={props.whisky.img} alt="whisky_img" /></p>
            </div>

            <div className={classes.Input}>
                <input className={props.correct.name ? classes.Correct : null} type="text" name="name" placeholder="Whisky Name" onChange={props.change} />
                <input className={props.correct.country ? classes.Correct : null} type="text" name="country" placeholder="Country" onChange={props.change} />
                <input className={props.correct.region ? classes.Correct : null} type="text" name="region" placeholder="Region" onChange={props.change} />
                <input className={props.correct.capacity ? classes.Correct : null} type="text" name="capacity" placeholder="Bottle capacity" onChange={props.change} />
                <input className={props.correct.years ? classes.Correct : null} type="text" name="years" placeholder="Years (l)" onChange={props.change} />
            </div>
        </div>

    </React.Fragment>
);

export default Modal;