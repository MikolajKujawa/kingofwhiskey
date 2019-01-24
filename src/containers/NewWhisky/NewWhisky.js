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

    newWhiskyHandler () {
        
    }

    render() {
        return (
            <div>
                <Modal
                    change={this.newWhiskyHandler}
                    newWhisky={this.state.newWhisky} />
            </div>
        );
    }
}