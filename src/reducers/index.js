import { combineReducers } from 'redux';
import { LibraryAppReducer } from './LibraryAppReducer';

export default combineReducers({
    libraryApp: LibraryAppReducer
});