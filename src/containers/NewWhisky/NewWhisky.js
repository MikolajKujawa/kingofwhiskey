import React, { PureComponent } from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import withErrorHandler from '../../hoc/withErrorHandler';
import ModalAddWhisky from '../../components/UI/Modal/ModalAddWhisky/ModalAddWhisky';
import { validationSystem } from '../../shared/utility';

class NewWhisky extends PureComponent {
    componentDidMount() {
        this.props.onDefaultValue();
    };

    confirmDataHandler = (event) => {
        let confirmStateCopy = { ...this.props.state.confirm };

        if (validationSystem(this.props.state.validation[event.target.name], this.props.state.whisky[event.target.name])) {
            confirmStateCopy[event.target.name]=1;
            this.props.onConfirmData(confirmStateCopy);
        } else {
            confirmStateCopy[event.target.name]=0;
            this.props.onConfirmData(confirmStateCopy);
        }

        confirmStateCopy = Object.keys(confirmStateCopy)
            .map(key => {
                return confirmStateCopy[key]
            });

        let confirmSum = confirmStateCopy
            .reduce((confirmStateCopy, el) => {
                return confirmStateCopy + el;
            }, 0);

        if (confirmSum===confirmStateCopy.length && confirmSum>1) {
            this.props.onAddNewWhisky(this.props.state.whisky, this.props.token, this.props.userId);
        }
    };

    render() {
        return (
            <div>
                <ModalAddWhisky
                    state={this.props.state}
                    confirmData={this.confirmDataHandler}
                    updateData={(event) => this.props.onUpdateNewWhiskyData(event.target.name, event.target.value)} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state.newWhisky,
        userId: state.auth.userId,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDefaultValue: () => dispatch(actions.loadDefaultValueNW()),
        onAddNewWhisky: (newWhisky, token, userId) => dispatch(actions.putNewWhisky(newWhisky, token, userId)),
        onUpdateNewWhiskyData: (name, value) => dispatch(actions.updateNewWhiskyData(name, value)),
        onConfirmData: (confirm) => dispatch(actions.confirmData(confirm))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(NewWhisky, axios));
