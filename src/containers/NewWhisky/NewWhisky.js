import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../../components/UI/Modal/Modal';

const defaultState = {
    newWhiskyData: {
        img: '',
        name: '',
        country: '',
        region: '',
        capacity: '',
        years: ''
    },
    confirm: {
        img: 0,
        name: 0,
        country: 0,
        region: 0,
        capacity: 0,
        years: 0
    },
    loading: false
};

class NewWhisky extends Component {
    state = {
        newWhiskyData: {
            img: '',
            name: '',
            country: '',
            region: '',
            capacity: '',
            years: ''
        },
        confirm: {
            img: 0,
            name: 0,
            country: 0,
            region: 0,
            capacity: 0,
            years: 0
        },
        loading: false
    };

    updateNewWhiskyDataHandler = (event) => {
        let newWhiskyDataCopy = { ...this.state.newWhiskyData };

        if (event.target.value < 1) {
            let confirmStateCopy = { ...this.state.confirm };
            confirmStateCopy[event.target.name]=0;
            this.setState({ confirm: confirmStateCopy });
        } else {
            newWhiskyDataCopy[event.target.name]=event.target.value;
            this.setState({ newWhiskyData: newWhiskyDataCopy });
        }
    };

    confirmDataHandler = (event) => {
        let confirmStateCopy = { ...this.state.confirm };

        if (this.state.newWhiskyData[event.target.name].length < 3) {
            confirmStateCopy[event.target.name]=0;
        } else {
            confirmStateCopy[event.target.name]=1;
        }

        this.setState({ confirm: confirmStateCopy });

        confirmStateCopy = Object.keys(confirmStateCopy)
            .map(key => {
                return confirmStateCopy[key]
            });

        let confirmSum = confirmStateCopy
            .reduce((confirmStateCopy, el) => {
                return confirmStateCopy + el;
            }, 0);

        if (confirmSum===confirmStateCopy.length) {
            this.newWhiskyHandler();
        }
    };

    newWhiskyHandler = () => {
        this.setState({ loading: true });

        const newWhiskyData = this.state.newWhiskyData;

        const newWhisky = {
            capacity: newWhiskyData.capacity,
            country: newWhiskyData.country,
            img: newWhiskyData.img,
            name: newWhiskyData.name,
            region: newWhiskyData.region,
            years: newWhiskyData.years
        };

        axios.get('https://kingofwhiskey-27cda.firebaseio.com/whisky.json')
            .then(res => {
                const nextRecord = res.data.length;
                console.log(res.data.length);
                axios.post('https://kingofwhiskey-27cda.firebaseio.com/whisky/' + nextRecord + '.json', newWhisky)
                    .then(res => {
                        console.log('test');
                        this.setState({ ...defaultState });
                    })
                    .catch(err => {
                        this.setState({ ...defaultState });
                        console.log(err);
                    })
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err);
            })
    };

    render() {
        return (
            <div>
                <Modal
                    state={this.state}
                    confirmData={this.confirmDataHandler}
                    updateData={this.updateNewWhiskyDataHandler} />
            </div>
        );
    }
}

export default NewWhisky;