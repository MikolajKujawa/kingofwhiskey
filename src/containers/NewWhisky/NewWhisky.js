import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../../components/UI/Modal/Modal';

let defaultData;

class NewWhisky extends Component {
    state = {
        loadingData: true
    };

    componentDidMount() {
        axios.get('/defaultValue.json')
            .then(res => {
                defaultData=res.data;
                this.setState(res.data);
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    };

    newWhiskyHandler = () => {
        this.setState({ loading: true });

        axios.get('/whisky.json')
            .then(res => {
                const nextRecord = res.data.length;
                axios.post('/whisky/' + nextRecord + '.json', this.state.whisky)
                    .then(res => {
                        console.log('test');
                        this.setState({ ...defaultData });
                    })
                    .catch(err => {
                        this.setState({ ...defaultData });
                        console.log(err);
                    })
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err);
            })
    };

    updateNewWhiskyDataHandler = (event) => {
        let newWhiskyDataCopy = { ...this.state.whisky };

        if (event.target.value < 1) {
            let confirmStateCopy = { ...this.state.confirm };
            confirmStateCopy[event.target.name]=0;
            this.setState({ confirm: confirmStateCopy });
        } else {
            newWhiskyDataCopy[event.target.name]=event.target.value;
            this.setState({ whisky: newWhiskyDataCopy });
        }
    };

    confirmDataHandler = (event) => {
        let confirmStateCopy = { ...this.state.confirm };

        if (this.state.whisky[event.target.name].length < 3) {
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