import * as Actions from '../actions/Constants';

const initialState = {
    userInfo: {},
    bookInfo: {}
};

export const LibraryAppReducer = (state = initialState, action) => {

    switch (action.type) {
        case Actions.UPDATE_USER_INFO:
            return {
                ...state,
                userInfo: action.updateUserInfo,
                showUserSection: true
            };
        case Actions.UPDATE_BOOK_INFO:
            return {
                ...state,
                bookInfo: action.updateBookInfo,
                showBookSection: true
            };
        default:
            return state;
    }
}