import React from 'react';
import { mount, shallow } from 'enzyme';
import User from '../../../src/components/User';
import ShowTable from '../../../src/components/ShowTable';


describe('Home page Tests', () => {
    let props;
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
        }));
    beforeEach(() => {
        props = {
            userInfo: [{ id: 1, name: "sample", books: "", bookList: [] }],
            updateUserInfo: jest.fn()
        }
    })
    it('should render User Component', () => {
        const renderedModule = shallow(<User {...props} />);
        expect(renderedModule).toMatchSnapshot();
    });
    it('should render ShowTable Component', () => {
        const renderedModule = mount(<User {...props} />);
        expect(renderedModule).toMatchSnapshot();
        expect(renderedModule.find(ShowTable).length).toBe(1);
    });
    it('should add user', () => {
        let user = [];
        const updateUserData = jest.fn(() => {
            user = [{ id: 1, name: 'Sample', books: "1", bookList: [1] },
            { id: 2, name: 'Sample1', books: "12", bookList: [12] }];
            return true;
        });
        const renderedModule = mount(<User {...props} updateUserData={updateUserData} />);

        renderedModule.find("#userName").simulate("change", {
            target: { value: "sample2" }
        });
        renderedModule.find("#addUser").simulate("click");

        expect(renderedModule).toMatchSnapshot();
        expect(renderedModule.find('#userName').text()).toBe('');
    });
});