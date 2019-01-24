import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

class GameLogic extends Component {
    state = {
        whisky: {
            img: 'http://store.jackdaniels.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/j/a/jack-daniels-tennessee-whiskey-bottle-front.png',
            name: 'Jack Daniels',
            country: 'USA',
            region: 'Tennessee',
            capacity: '0.7',
            years: '2018'
        }
    };

    TestDataHandler = (event) => {
        switch (event.target.name) {
            case ('name'):
                if (this.state.whisky.name === event.target.value) console.log('ok');
            break;
            case ('country'):
                if (this.state.whisky.country === event.target.value) console.log('ok');
            break;
            case ('region'):
                if (this.state.whisky.region === event.target.value) console.log('ok');
            break;
            case ('capacity'):
                if (this.state.whisky.capacity === event.target.value) console.log('ok');
                break;
            case ('years'):
                if (this.state.whisky.years === event.target.value) console.log('ok');
                break;
            default:
                break;
        }
    };

    render() {
        return(
            <div>
                <Modal
                    whisky={this.state.whisky}
                    change={this.TestDataHandler}
                />

                <button>Next</button>
            </div>
        );
    }
}

export default GameLogic;