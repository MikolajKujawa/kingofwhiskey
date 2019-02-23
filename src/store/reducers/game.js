import * as actionTypes from '../actions/actionTypes';

const initState = {
    loadingData: true
};

const game = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.DEFAULT_VALUE_GAME:
            return {
                ...state,
                ...action.defaultValue
            };
        case actionTypes.RANDOM_WHISKY:
            return {
                ...state,
                whisky: {...action.whisky},
                loading: false
            };
        case actionTypes.VIEW_CORRECT_DATA:
            let correctCopy = { ...state.correct };

            correctCopy[action.name]=1;

            return {
                ...state,
                correct: correctCopy
            };
        case actionTypes.TEST_DATA:
            const correctCopyTest = { ...state.correct };
            const whiskyCopy = { ...state.whisky };
            const valueCopy = { ...state.value };

            valueCopy[action.name]=action.value;

            if (action.value.toLowerCase()===whiskyCopy[action.name].toLowerCase()) {
                correctCopyTest[action.name] = 1;
            } else {
                correctCopyTest[action.name] = 0;
            }

            return {
                ...state,
                correct: correctCopyTest,
                value: valueCopy,
            };
        case actionTypes.LOADING_DATA:
            return {
                ...state,
                loadingData: action.statusData,
                loading: action.status
            };
        default: return state;
    }
};

export default game;
