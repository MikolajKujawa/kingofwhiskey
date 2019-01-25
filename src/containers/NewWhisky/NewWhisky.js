import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../../components/UI/Modal/Modal';

class NewWhisky extends Component {
    state = {
        newWhisky: {
            img: '',
            name: '',
            country: '',
            region: '',
            capacity: '',
            years: ''
        }
    };

    newWhiskyHandler = (event) => {
        console.log(event.target);
    };

    render() {
        return (
            <div>
                <Modal
                    change={null}
                    newWhisky={true}
                    addWhisky={this.newWhiskyHandler}
                    submit={true} />
            </div>
        );
    }
}

export default NewWhisky;