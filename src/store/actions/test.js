import * as actionTypes from './actionTypes';

export const setRecordsTest = (recordsTest) => {
    return {
        type: actionTypes.SET_RECORDS_TEST,
        recordsTest: recordsTest
    };
};

export const fetchRecordsTestStart = () => {
    return {
        type: actionTypes.FETCH_RECORDS_TEST_START
    };
};

export const getRecordsTest = (name) => {
    const recordsTest =  [
        {id: 1, name: "record 1"},
        {id: 2, name: "record 2"},
        {id: 3, name: "record 3"},
        {id: 4, name: "record 4"},
        {id: 5, name: "record 5"}
    ];
    return dispatch => {
        dispatch(fetchRecordsTestStart());
        dispatch(setRecordsTest(filter(name, recordsTest)));
    };
};

const filter = (name, recordsTest) => {
    let result = recordsTest;
    if (name !== null) {
        result = recordsTest.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
    }
    return result;
};
