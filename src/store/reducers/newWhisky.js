import * as actionTypes from '../actions/actionTypes';
import { returnError, updateObject } from '../../shared/utility';

const initState = {
    loading: true
};

const updateNewWhisky = (state, action) => {
    let newWhiskyDataCopy = { ...state.whisky };
    let confirmStateCopy = { ...state.confirm };

    confirmStateCopy[action.name]=0;
    newWhiskyDataCopy[action.name]=action.value;

    return updateObject(state,{
        whisky: newWhiskyDataCopy,
        confirm: confirmStateCopy
    });
};

const newWhisky = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.DEFAULT_VALUE_NEW: return updateObject(state, { ...action.defaultValue });
        case actionTypes.UPDATE_NEW_WHISKY: return updateNewWhisky(state, action);
        case actionTypes.CONFIRM_DATA: return updateObject(state, { confirm: action.confirm });
        case actionTypes.LOADING_NEW: return updateObject(state, { loading: action.status });
        case actionTypes.FETCH_DATA_FAIL_NEW: return returnError(state, action.error);
        default: return state;
    }
};

export default newWhisky;
