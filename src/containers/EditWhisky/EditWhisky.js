import React, { PureComponent } from 'react';
import withErrorHnadler from '../../hoc/withErrorHandler';
import axios from 'axios';

import Modal from '../../components/UI/Modal/ModalEditWhisky/ModalEditWhisky';

class EditWhisky extends PureComponent {
    state = {
        loadingData: true,
    };

    componentDidMount() {
        axios.get('/whisky.json')
            .then(res => {
                const whisky=[];
                const value=[];
                const fbKey=[];
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

		        let range = (currentPage-1)*5;

                this.setState({
                    whisky: { ...whisky.splice(range, range+5) },
                    value: { ...value.splice(range, range+5) },
                    changeValue: { ...changeValue.splice(range, range+5) },
                    fbKey: { ...fbKey.splice(range, range+5) },
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

        changeValueCopy[id][inputName] =
            !(event.target.value === whiskyDefaultValue || event.target.value.length < 2);

        valueCopy[id][inputName]=event.target.value;

        this.setState({ value: valueCopy })
    };

    editWhiskyDataHandler = (event) => {
        let id=event.target.id;
        let inputName=event.target.name;
        let fbKey = this.state.fbKey[id]['key2'];
        let whiskyCopy = { ...this.state.whisky };
        let changeValueCopy = { ...this.state.changeValue };

        if (this.state.value[id][inputName].length > 2) {
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
                    return err;
                })
        }
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

export default withErrorHnadler(EditWhisky, axios);
