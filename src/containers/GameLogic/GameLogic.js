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
        },
        correct: {
            name: false,
            country: false,
            region: false,
            capacity: false,
            years: false
        }
    };

    componentDidMount() {
        axios.get('https://kingofwhiskey-27cda.firebaseio.com/whisky/1.json')
            .then(res => {
                this.setState({
                    whisky: res.data
                });
                console.log(res.data);
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
        const correctCopy = { ...this.state.correct };
        switch (event.target.name) {
            case ('name'):
                if (this.state.whisky.name === event.target.value) {
                    correctCopy['name']=true;
                    this.setState({ correct: correctCopy })
                } else {
                    correctCopy['name']=false;
                    this.setState({ correct: correctCopy })
                }
            break;
            case ('country'):
                if (this.state.whisky.country === event.target.value) {
                    correctCopy['country']=true;
                    this.setState({ correct: correctCopy })
                } else {
                    correctCopy['country']=false;
                    this.setState({ correct: correctCopy })
                }
            break;
            case ('region'):
                if (this.state.whisky.region === event.target.value) {
                    correctCopy['region']=true;
                    this.setState({ correct: correctCopy })
                } else {
                    correctCopy['region']=false;
                    this.setState({ correct: correctCopy })
                }
            break;
            case ('capacity'):
                if (this.state.whisky.capacity === event.target.value) {
                    correctCopy['capacity']=true;
                    this.setState({ correct: correctCopy })
                } else {
                    correctCopy['capacity']=false;
                    this.setState({ correct: correctCopy })
                }
                break;
            case ('years'):
                if (this.state.whisky.years === event.target.value) {
                    correctCopy['years']=true;
                    this.setState({ correct: correctCopy })
                } else {
                    correctCopy['years']=false;
                    this.setState({ correct: correctCopy })
                }
                break;
            default:
                break;
        }
    };

    render() {
        return(
            <div>
                <Modal
                    correct={this.state.correct}
                    whisky={this.state.whisky}
                    change={this.testDataHandler}
                />
            </div>
        );
    }
}

export default GameLogic;