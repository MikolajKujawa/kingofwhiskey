import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../../components/UI/Modal/ModalEditWhisky/ModalEditWhisky';

class EditWhisky extends Component {
    state = {
        loadingData: true,
    };

    componentDidMount() {
        axios.get('/whisky.json')
            .then(res => {
                let whisky=[];
                let value=[];
                let fbKey=[];
                let changeValue=[];
                for (let key in res.data) {
                    for (let key2 in res.data[key]) {
                        whisky.push({ ...res.data[key][key2] });
                        value.push({ ...res.data[key][key2] });
                        changeValue.push({ ...res.data[key][key2] });
                        fbKey.push({ key2 });
                        for (let key3 in res.data[key][key2]) {
                            changeValue[key][key3]=false;
                        }
                    }
                }

                const pages = Math.ceil(whisky.length/5);
                let currentPage = this.props.location.search.substring(1);

                if (!currentPage) currentPage=1;

                this.setState({
                    whisky: { ...whisky.splice(currentPage*5-5, currentPage*5) },
                    value: { ...value.splice(currentPage, 5*currentPage) },
                    changeValue: { ...changeValue.splice(currentPage, 5*currentPage) },
                    fbKey: { ...fbKey.splice(currentPage, 5*currentPage) },
                    pages: pages,
                    currentPage: currentPage,
                    loadingData: false
                })
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    changeWhiskyDataHandler = (event) => {
        let id=event.target.id;
        let inputName=event.target.name;
        let valueCopy = { ...this.state.value };
        let changeValueCopy = { ...this.state.changeValue };
        const whiskyDefaultValue = this.state.whisky[id][inputName];

        if(event.target.value===whiskyDefaultValue) {
            changeValueCopy[id][inputName]=false;
        } else {
            changeValueCopy[id][inputName]=true;
        }
        
        valueCopy[id][inputName]=event.target.value;

        this.setState({ value: valueCopy })
    };

    editWhiskyDataHandler = (event) => {
        let id=event.target.id;
        let inputName=event.target.name;
        let fbKey = this.state.fbKey[id]['key2'];
        let whiskyCopy = { ...this.state.whisky };
        let changeValueCopy = { ...this.state.changeValue };

        whiskyCopy[id][inputName]=this.state.value[id][inputName];
        
        axios.put('/whisky/'+id+'/'+fbKey+'.json', whiskyCopy[id])
            .then(res => {
                changeValueCopy[id][inputName]=false;
                this.setState({
                    whisky: whiskyCopy,
                    changeValue: changeValueCopy
                });
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        return(
            <React.Fragment>
                <Modal
                    state={this.state}
                    change={this.changeWhiskyDataHandler}
                    edit={this.editWhiskyDataHandler} />
            </React.Fragment>
        );
    }
}

export default EditWhisky;