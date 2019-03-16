import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadFetchData = (data) => {
    return {
        type: actionTypes.LOAD_FETCH_DATA,
        data: data
    };
};

export const changeWhiskyData = (value) => {
    return {
        type: actionTypes.CHANGE_WHISKY_DATA,
        value: value
    };
};

export const editWhiskyData = (whisky, changeValue) => {
    return {
        type: actionTypes.EDIT_WHISKY_DATA,
        whisky: whisky,
        changeValue: changeValue
    };
};

export const loading = (status) => {
    return {
        type: actionTypes.LOADING_EDIT,
        status: status
    };
};

export const fetchDataFailed = (err) => {
    return {
        type: actionTypes.FETCH_DATA_FAIL_EDIT,
        error: err
    };
};

export const fetchData = (page, userId, yourWhisky) => {
    return dispatch => {
        dispatch(loading(true));
        axios.get('/whisky.json')
            .then(res => {
                const whisky=[];
                const value=[];
                const fbKey=[];
                const id=[];
                let changeValue=[];
                let i = 0;

                for (let key in res.data) {
                    for (let key2 in res.data[key]) {
                        if (yourWhisky) {
                            if (res.data[key][key2].userId === userId) {
                                whisky.push({ ...res.data[key][key2] });
                                value.push({ ...res.data[key][key2] });
                                changeValue.push({ ...res.data[key][key2] });
                                fbKey.push({ key2 });
                                id.push({ key });
                                for (let key3 in res.data[key][key2]) {
                                    changeValue[i][key3] = false;
                                }
                                i++;
                            }
                        } else {
                            whisky.push({ ...res.data[key][key2] });
                            value.push({ ...res.data[key][key2] });
                            changeValue.push({ ...res.data[key][key2] });
                            fbKey.push({ key2 });
                            id.push({ key });
                            for (let key3 in res.data[key][key2]) {
                                changeValue[key][key3] = false;
                            }
                        }
                    }
                }

                const pages = Math.ceil(whisky.length/5);
                if (!page) page="1";
                let range = (page-1)*5;

                axios.get('/defaultValue.json')
                    .then(res => {
                        const data = {
                            validation: res.data.validation,
                            whisky: { ...whisky.slice(range, range+5) },
                            value: { ...value.slice(range, range+5) },
                            changeValue: { ...changeValue.slice(range, range+5) },
                            fbKey: { ...fbKey.slice(range, range+5) },
                            id: { ...id.slice(range, range+5) },
                            pages: pages,
                            currentPage: page,
                        };
                        dispatch(loadFetchData(data));
                    })
                    .catch(err => {
                        dispatch(fetchDataFailed(err));
                    })
            })
            .catch(err => {
                dispatch(fetchDataFailed(err));
            })
    };
};
