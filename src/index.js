import React from 'react';
import ReactDOM from 'react-dom';
import LibraryAppContainer from '../src/containers/LibraryAppContainer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';


ReactDOM.render(
    <React.StrictMode>
        <Provider store={createStore(reducers)}>
            <LibraryAppContainer />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);