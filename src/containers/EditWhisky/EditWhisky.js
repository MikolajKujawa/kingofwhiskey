import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../../components/UI/Modal/ModalEditWhisky/ModalEditWhisky';

class EditWhisky extends Component {
    state = {
        whisky: {

        },
        value: {

        },
        loadingData: true,
    };

    componentDidMount() {
        axios.get('/whisky.json')
            .then(res => {
                let whisky=[];
                let fbKey=[];
                for (let key in res.data) {
                    for (let key2 in res.data[key]) {
                        whisky.push({ ...res.data[key][key2] });
                        fbKey.push({ key2 });
                    }
                }

                this.setState({
                    whisky: { ...whisky },
                    value: { ...whisky },
                    fbKey: { ...fbKey },
                    loadingData: false
                })
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    changeWhiskyDataHandler = (event) => {
        let valueCopy = { ...this.state.value };

        valueCopy[event.target.id][event.target.name]=event.target.value;

        this.setState({ value: valueCopy })
    };

    editWhiskyDataHandler = (event) => {
        let id=event.target.id;
        let inputName=event.target.name;
        let fbKey = this.state.fbKey[id]['key2'];
        let whiskyCopy = { ...this.state.whisky[id] };

        whiskyCopy[inputName]=this.state.value[id][inputName];
        
        axios.put('/whisky/'+id+'/'+fbKey+'.json', whiskyCopy)
            .then(res => {
                console.log(res.data)
            })
    };

    render() {
        return(
            <React.Fragment>
                <Modal
                    state={this.state}
                    change={this.changeWhiskyDataHandler}
                    edit={this.editWhiskyDataHandler}/>
            </React.Fragment>
        );
    }
}

export default EditWhisky;