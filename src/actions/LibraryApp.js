import * as Constants from './Constants';

export const updateUserInfo = (updateUserInfo) => (
    {
        type: Constants.UPDATE_USER_INFO,
        updateUserInfo
    }
);

export const updateBookInfo = (updateBookInfo) => (
    {
        type: Constants.UPDATE_BOOK_INFO,
        updateBookInfo
    }
);