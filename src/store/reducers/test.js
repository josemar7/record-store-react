import * as actionTypes from '../actions/actionTypes';

const initialState = {
    recordsTest: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_RECORDS_TEST:
            return {
                ...state,
                recordsTest: action.recordsTest,
                loading: false
            };      
        case actionTypes.FETCH_RECORDS_TEST_START:
            return {
                ...state,
                loading: true
            };
    }
    return state;

};

export default reducer;