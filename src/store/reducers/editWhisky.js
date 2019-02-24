import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    loading: true
};

const editWhisky = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_FETCH_DATA: return updateObject(state, { ...action.data, loading: false });
        case actionTypes.CHANGE_WHISKY_DATA: return updateObject(state, { value: action.value });
        case actionTypes.EDIT_WHISKY_DATA: return updateObject(state, { whisky: action.whisky, changeValue: action.changeValue });
        case actionTypes.LOADING_EDIT: return updateObject(state, { loading: action.status });
        case actionTypes.FETCH_DATA_FAIL_EDIT: return updateObject(state, { loading: false });
        default: return state;
    }
};

export default editWhisky;
