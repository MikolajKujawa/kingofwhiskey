import React, { PureComponent } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import withErrorHandler from '../../hoc/withErrorHandler';
import ModalEditWhisky from '../../components/UI/Modal/ModalEditWhisky/ModalEditWhisky';
import Validation from '../../components/ValidationSystem/ValidationSystem';

class EditWhisky extends PureComponent {
    state = {
        changePage: false
    };

    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.props.onLoadFetchData(this.props.location.search.substring(1));
        }
    }

    componentDidMount() {
        this.props.onLoadFetchData(this.props.location.search.substring(1));
    }

    changePageActionHandler = () => {
        this.setState({
            changePage: !this.state.changePage
        });
    };

    changeWhiskyDataHandler = (event) => {
        let id=event.target.id;
        let inputName=event.target.name;
        let valueCopy = { ...this.props.state.value };
        let changeValueCopy = { ...this.props.state.changeValue };
        const whiskyDefaultValue = this.props.state.whisky[id][inputName];

        changeValueCopy[id][inputName] =
            (event.target.value !== whiskyDefaultValue &&
            Validation(this.props.state.validation[inputName], event.target.value));

        valueCopy[id][inputName]=event.target.value;

        this.props.onChangeWhiskyData(valueCopy);
    };

    editWhiskyDataHandler = (event) => {
        let id=event.target.id;
        let inputName=event.target.name;
        let fbKey = this.props.state.fbKey[id]['key2'];
        let whiskyCopy = { ...this.props.state.whisky };
        let changeValueCopy = { ...this.props.state.changeValue };

        if (changeValueCopy[id][inputName]) {
            whiskyCopy[id][inputName]=this.props.state.value[id][inputName];
            axios.put('/whisky/'+id+'/'+fbKey+'.json', whiskyCopy[id])
                .then(res => {
                    changeValueCopy[id][inputName]=false;
                    this.props.onEditWhiskyData(whiskyCopy, changeValueCopy);
                    return res;
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
                <ModalEditWhisky
                    state={this.props.state}
                    changePage={this.changePageActionHandler}
                    change={this.changeWhiskyDataHandler}
                    edit={this.editWhiskyDataHandler} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.editWhisky
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadFetchData: (page) => dispatch(actions.fetchData(page)),
        onChangeWhiskyData: (value) => dispatch(actions.changeWhiskyData(value)),
        onEditWhiskyData: (whisky, changeValue) => dispatch(actions.editWhiskyData(whisky, changeValue))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(EditWhisky), axios));
