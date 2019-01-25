import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../../components/UI/Modal/Modal';

class GameLogic extends Component {
    state = {
        whisky: {
            img: '',
            name: '',
            country: '',
            region: '',
            capacity: '',
            years: ''
        }
    };

    componentDidMount() {
        axios.get('https://kingofwhiskey-27cda.firebaseio.com/whisky/1.json')
            .then(res => {
                this.setState({
                    whisky: res.data
                })
            })
            .catch(err => {
                return err;
            })
    };

    nextWhiskyHandler = () => {
        axios.get('https://kingofwhiskey-27cda.firebaseio.com/whisky/1.json')
            .then(res => {
                this.setState({
                    whisky: res.data
                });
            })
            .catch(err => {
                return err;
            })
    };

    testDataHandler = (event) => {
        switch (event.target.name) {
            case ('name'):
                if (this.state.whisky.name === event.target.value) console.log('ok');
            break;
            case ('country'):
                if (this.state.whisky.country === event.target.value) console.log('ok');
            break;
            case ('region'):
                if (this.state.whisky.region === event.target.value) console.log('ok');
            break;
            case ('capacity'):
                if (this.state.whisky.capacity === event.target.value) console.log('ok');
                break;
            case ('years'):
                if (this.state.whisky.years === event.target.value) console.log('ok');
                break;
            default:
                break;
        }
    };

    render() {
        return(
            <div>
                <Modal
                    whisky={this.state.whisky}
                    change={this.testDataHandler}
                />

                <button onClick={this.nextWhiskyHandler}>Next</button>
            </div>
        );
    }
}

export default GameLogic;