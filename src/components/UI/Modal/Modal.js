import React from 'react';

const Modal = (props) => (
    <div>
            <form>
                { props.newWhisky ?
                    <input type="text" name="img" placeholder="Whisky img" onChange={props.change} /> :
                        <p><img src={props.whisky.img} alt="whisky_img" /></p> }

                <input type="text" name="name" placeholder="Whisky Name" onChange={props.change} />
                <input type="text" name="country" placeholder="Country" onChange={props.change} />
                <input type="text" name="region" placeholder="Region" onChange={props.change} />
                <input type="text" name="capacity" placeholder="Bottle capacity" onChange={props.change} />
                <input type="text" name="years" placeholder="Years (l)" onChange={props.change} />

                    { props.submit ? <input type="submit" value="Submit" onClick={props.addWhisky} /> : null }
            </form>
    </div>
);

export default Modal;