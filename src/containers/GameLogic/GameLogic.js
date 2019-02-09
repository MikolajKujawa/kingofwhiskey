import React, { PureComponent } from 'react';
import axios from 'axios';

import withErrorHandler from '../../hoc/withErrorHandler';
import Modal from '../../components/UI/Modal/ModalGame/ModalGame';

let defaultData;

class GameLogic extends PureComponent {
    state = {
        loadingData: true,
    };

    componentDidMount() {
        axios.get('/defaultValue.json')
            .then(res => {
                const whisky = { ...res.data.whisky };
                delete res.data.whisky.img;
                defaultData={
                    correct: res.data.correct,
                    whisky: whisky,
                    value: res.data.whisky,
                    loading: res.data.loading,
                    loadingData: res.data.loadingData,
                    helpInfo: res.data.helpInfo
                };
                this.setState(defaultData);
                this.randomWhiskyHandler();
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    };

    componentDidUpdate() {
        let correctCopy = { ...this.state.correct };

        correctCopy = Object.keys(correctCopy)
            .map(key =>{
                return correctCopy[key];
            });

        let correctSum = correctCopy
            .reduce((correctCopy, el) => {
                return correctCopy + el;
            }, 0);

        if (correctSum===correctCopy.length) {
            setTimeout(() => {
                this.setState({ ...defaultData });
                this.randomWhiskyHandler();
            },1000)
        }
    };

    randomWhiskyHandler = () => {
        this.setState({ loading: true });
        axios.get('/whisky.json')
            .then(res => {
                const randomWhisky = Math.floor(Math.random() * res.data.length);
                axios.get('/whisky/'+ randomWhisky +'.json')
                    .then(res => {
                        const data = Object.keys(res.data)
                            .map(key => {
                                return res.data[key];
                            });
                        this.setState({
                            whisky: { ...data[0] }
                        });
                        this.setState({ loading: false });
                    })
                    .catch(err => {
                        console.log(err);
                        return err;
                    })
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    };

    viewCorrectDataHandler = (event) => {
        let correctCopy = { ...this.state.correct };

        correctCopy[event.target.name]=1;

        this.setState({ correct: correctCopy });
    };

    testDataHandler = (event) => {
        const correctCopy = { ...this.state.correct };
        const whiskyCopy = { ...this.state.whisky };
        const valueCopy = { ...this.state.value };

        valueCopy[event.target.name]=event.target.value;

        if (event.target.value.toLowerCase()===whiskyCopy[event.target.name].toLowerCase()) {
            correctCopy[event.target.name] = 1;
        } else {
            correctCopy[event.target.name] = 0;
        }

        this.setState({ correct: correctCopy, value: valueCopy })
    };

    render() {
        return(
            <div>
                <Modal
                    viewHandler={this.viewCorrectDataHandler}
                    state={this.state}
                    next={this.randomWhiskyHandler}
                    change={this.testDataHandler}
                />
            </div>
        );
    }
}

export default withErrorHandler(GameLogic, axios);