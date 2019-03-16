import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import withErrorHandler from '../../hoc/withErrorHandler';
import ModalEditWhisky from '../../components/UI/Modal/ModalEditWhisky/ModalEditWhisky';
import { validationSystem } from '../../shared/utility';

class EditWhisky extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search || prevProps.location.pathname !== this.props.location.pathname) {
            this.props.onLoadFetchData(this.props.location.search.substring(1), this.props.userId, this.props.yourWhisky);
        }
    }

    componentDidMount() {
        this.props.onLoadFetchData(this.props.location.search.substring(1), this.props.userId, this.props.yourWhisky);
    }

    changeWhiskyDataHandler = (event, key) => {
        let inputName = event.target.name;
        let valueCopy = { ...this.props.state.value };
        let changeValueCopy = { ...this.props.state.changeValue };
        const whiskyDefaultValue = this.props.state.whisky[key][inputName];

        changeValueCopy[key][inputName] =
            (event.target.value !== whiskyDefaultValue &&
            validationSystem(this.props.state.validation[inputName], event.target.value));

        valueCopy[key][inputName]=event.target.value;

        this.props.onChangeWhiskyData(valueCopy);
    };

    editWhiskyDataHandler = (event, key) => {
        let whiskyId = event.target.id;
        let inputName = event.target.name;
        let fbKey = this.props.state.fbKey[key]['key2'];
        let whiskyCopy = { ...this.props.state.whisky };
        let changeValueCopy = { ...this.props.state.changeValue };

        if (changeValueCopy[key][inputName]) {
            whiskyCopy[key][inputName]=this.props.state.value[key][inputName];
            axios.put('/whisky/' + whiskyId + '/'+fbKey+'.json?auth=' + this.props.token, whiskyCopy[key])
                .then(res => {
                    changeValueCopy[key][inputName]=false;
                    this.props.onEditWhiskyData(whiskyCopy, changeValueCopy, this.props.token);
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
                    isAdmin={this.props.isAdmin}
                    userId={this.props.userId}
                    change={(event, key) => this.changeWhiskyDataHandler(event, key)}
                    edit={(event, key) => this.editWhiskyDataHandler(event, key)} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.editWhisky,
        token: state.auth.token,
        isAdmin: state.auth.isAdmin,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadFetchData: (page, userId, yourWhisky) => dispatch(actions.fetchData(page, userId, yourWhisky)),
        onChangeWhiskyData: (value) => dispatch(actions.changeWhiskyData(value)),
        onEditWhiskyData: (whisky, changeValue) => dispatch(actions.editWhiskyData(whisky, changeValue))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(EditWhisky, axios)));
