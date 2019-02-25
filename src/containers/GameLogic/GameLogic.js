import React, { PureComponent } from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import withErrorHandler from '../../hoc/withErrorHandler';
import ModalGame from '../../components/UI/Modal/ModalGame/ModalGame';

class GameLogic extends PureComponent {
    componentDidMount() {
        this.props.onLoadNewWhisky();
    };

    componentDidUpdate() {
        let correctCopy = { ...this.props.state.correct };

        correctCopy = Object.keys(correctCopy)
            .map(key =>{
                return correctCopy[key];
            });

        let correctSum = correctCopy
            .reduce((correctCopy, el) => {
                return correctCopy + el;
            }, 0);

        if (correctSum===correctCopy.length && !this.props.state.loading) {
            setTimeout(() => {
                this.props.onLoadNewWhisky();
            },1000)
        }
    };

    render() {
        return(
            <div>
                <ModalGame
                    viewHandler={(event) => this.props.onViewCorrectData(event.target.name)}
                    state={this.props.state}
                    next={this.props.onLoadNewWhisky}
                    change={(event) => this.props.onTestData(event.target.name, event.target.value)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state.game
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadNewWhisky: () => dispatch(actions.onLoadNewWhisky()),
        onViewCorrectData: (name) => dispatch(actions.viewCorrectData(name)),
        onTestData: (name, value) => dispatch(actions.testData(name, value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(GameLogic, axios));
