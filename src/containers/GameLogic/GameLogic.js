import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../../components/UI/Modal/Modal';

const defaultCorrect = {
    name: 0,
    country: 0,
    region: 0,
    capacity: 0,
    years: 0
};

const defaultValue = {
    name: '',
    country: '',
    region: '',
    capacity: '',
    years: ''
};

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
            name: 0,
            country: 0,
            region: 0,
            capacity: 0,
            years: 0
        },
        value: {
            name: '',
            country: '',
            region: '',
            capacity: '',
            years: ''
        },
        loading: false
    };

    componentDidMount() {
        this.setState({ loading: true });

        axios.get('https://kingofwhiskey-27cda.firebaseio.com/whisky.json')
            .then(res => {
                const randomWhisky = Math.floor(Math.random() * res.data.length);
                console.log(randomWhisky);
                axios.get('https://kingofwhiskey-27cda.firebaseio.com/whisky/'+ randomWhisky +'.json')
                    .then(res => {
                        const data = Object.keys(res.data)
                            .map(key => {
                                return res.data[key];
                            });
                        console.log( data[1] );
                        this.setState({
                            whisky: { ...data[0] }
                        });
                        this.setState({ loading: false });
                    })
                    .catch(err => {
                        return err;
                    })
            })
            .catch(err => {
                return err;
            })
    };

    componentDidUpdate() {
        let correctCopy = { ...this.state.correct };

        correctCopy = Object.keys(correctCopy)
            .map(key =>{
                return correctCopy[key];
            });

        let correctSum = correctCopy
            .reduce((correctCopy, el) => {
                return correctCopy + el;
            }, 0);

        if (correctSum===correctCopy.length) {
            setTimeout(() => {
                this.setState({ correct: defaultCorrect, value: defaultValue });
                this.nextWhiskyHandler();
            },1000)
        }
    }

    viewCorrectDataHandler = (event) => {
        let correctCopy = { ...this.state.correct };

        correctCopy[event.target.name]=1;

        this.setState({ correct: correctCopy });
    };

    nextWhiskyHandler = () => {
        this.setState({ loading: true });
        axios.get('https://kingofwhiskey-27cda.firebaseio.com/whisky.json')
            .then(res => {
                const randomWhisky = Math.floor(Math.random() * res.data.length);
                axios.get('https://kingofwhiskey-27cda.firebaseio.com/whisky/'+ randomWhisky +'.json')
                    .then(res => {
                        const data = Object.keys(res.data)
                            .map(key => {
                                return res.data[key];
                            });
                        this.setState({
                            whisky: { ...data[0] }
                        });
                        this.setState({ loading: false });
                    })
                    .catch(err => {
                        return err;
                    })
            })
            .catch(err => {
                return err;
            })
    };

    testDataHandler = (event) => {
        const correctCopy = { ...this.state.correct };
        const whiskyCopy = { ...this.state.whisky };
        const valueCopy = { ...this.state.value };

        valueCopy[event.target.name]=event.target.value;

        if (event.target.value===whiskyCopy[event.target.name]) {
            correctCopy[event.target.name] = 1;
        } else {
            correctCopy[event.target.name] = 0;
        }

        this.setState({ correct: correctCopy, value: valueCopy })
    };

    render() {
        return(
            <div>
                <Modal
                    viewHandler={this.viewCorrectDataHandler}
                    state={this.state}
                    change={this.testDataHandler}
                />
            </div>
        );
    }
}

export default GameLogic;