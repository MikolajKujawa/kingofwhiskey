import * as actionTypes from '../actions/actionTypes';
import { returnError, updateObject } from '../../shared/utility';

const initState = {
    loading: true
};

const viewCorrectData = (state, action) => {
    let correctCopy = { ...state.correct };
    correctCopy[action.name]=1;

    return updateObject(state, {
        correct: correctCopy
    });
};

const testingData = (state, action) => {
    const correctCopyTest = { ...state.correct };
    const whiskyCopy = { ...state.whisky };
    const valueCopy = { ...state.value };

    valueCopy[action.name]=action.value;

    if (action.value.toLowerCase()===whiskyCopy[action.name].toLowerCase()) {
        correctCopyTest[action.name] = 1;
    } else {
        correctCopyTest[action.name] = 0;
    }

    return updateObject(state,{
        correct: correctCopyTest,
        value: valueCopy,
    });
};

const game = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.DEFAULT_VALUE_GAME: return updateObject(state, { ...action.defaultValue });
        case actionTypes.RANDOM_WHISKY: return updateObject(state, { whisky: action.whisky, loading: false });
        case actionTypes.VIEW_CORRECT_DATA: return viewCorrectData(state, action);
        case actionTypes.TESTING_DATA: return testingData(state, action);
        case actionTypes.LOADING_GAME: return updateObject(state, { loading: action.status });
        case actionTypes.FETCH_DATA_FAIL_GAME: return returnError(state, action.error);
        default: return state;
    }
};

export default game;
