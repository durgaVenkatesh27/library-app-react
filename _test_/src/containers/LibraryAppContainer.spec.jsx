import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import LibraryAppContainer from '../../../src/containers/LibraryAppContainer';
import reducers from '../../../src/reducers/index';

describe('Library App Container Tests', () => {
    let props;
    beforeEach(() => {
        props = {
            libraryApp: {
                userInfo: {},
                bookInfo: {},
                updateUserInfo: jest.fn(),
                updateBookInfo: jest.fn()
            }
        }
    });

    it('should render Library App Component', () => {
        const renderedModule = shallow(<LibraryAppContainer {...props} store={createStore(reducers)} />);
        expect(renderedModule).toMatchSnapshot();
    })

});