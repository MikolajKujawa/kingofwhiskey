import React, { PureComponent } from 'react';
import axios from 'axios';

import withErrorHandler from '../../hoc/withErrorHandler';
import ModalAddWhisky from '../../components/UI/Modal/ModalAddWhisky/ModalAddWhisky';
import Validation from '../../components/ValidationSystem/ValidationSystem';

let defaultData;

class NewWhisky extends PureComponent {
    state = {
        loadingData: true
    };

    componentDidMount() {
        axios.get('/defaultValue.json')
            .then(res => {
                defaultData={
                    validation: res.data.validation,
                    confirm: res.data.confirm,
                    whisky: res.data.whisky,
                    loading: res.data.loading,
                    loadingData: res.data.loadingData
                };
                this.setState(defaultData);
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
                        this.setState({ ...defaultData });
                        console.log(res);
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
        let confirmStateCopy = { ...this.state.confirm };

        confirmStateCopy[event.target.name]=0;

        newWhiskyDataCopy[event.target.name]=event.target.value;
        this.setState({ whisky: newWhiskyDataCopy, confirm: confirmStateCopy });
    };

    confirmDataHandler = (event) => {
        let confirmStateCopy = { ...this.state.confirm };

        if (Validation(this.state.validation[event.target.name], this.state.whisky[event.target.name])) {
            confirmStateCopy[event.target.name]=1;
            this.setState({ confirm: confirmStateCopy });
        } else {
            confirmStateCopy[event.target.name]=0;
            this.setState({ confirm: confirmStateCopy });
        }

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
                <ModalAddWhisky
                    state={this.state}
                    confirmData={this.confirmDataHandler}
                    updateData={this.updateNewWhiskyDataHandler} />
            </div>
        );
    }
}

export default withErrorHandler(NewWhisky, axios);