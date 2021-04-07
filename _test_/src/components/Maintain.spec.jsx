import React from 'react';
import { mount, shallow } from 'enzyme';
import Maintain from '../../../src/components/Maintain';
import ShowTable from '../../../src/components/ShowTable';
import ErrorAlert from '../../../src/commons/ErrorAlert';


describe('Book component Tests', () => {
    let props;
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
        })
    );
    beforeEach(() => {
        fetch.mockClear();
        props = {

            bookInfo: [{ id: 1, bookTitle: 'Sample', isAvailable: true }],
            userInfo: [{ id: 1, name: "sample", books: "1", bookList: [1] }],
            updateUserInfo: jest.fn(),
            updateBookInfo: jest.fn()
        }
    })
    it('should render Maintain Component', () => {
        const renderedModule = shallow(<Maintain {...props} />);
        expect(renderedModule).toMatchSnapshot();
    });
    it('should render Library Table Component', () => {
        const renderedModule = mount(<Maintain {...props} />);
        expect(renderedModule).toMatchSnapshot();
        expect(renderedModule.find(ShowTable).length).toBe(1);
        expect(renderedModule.find('.borrow').length).toBe(3);
    });
    it('should render Borrowed list Table - fails', () => {
        const renderedModule = mount(<Maintain {...props} />);
        expect(renderedModule).toMatchSnapshot();
        expect(renderedModule.find('.return').length).toBe(0);
    });
    it('should render Borrowed list Table success', () => {
        const renderedModule = mount(<Maintain {...props} />);

        renderedModule.find("#userNameSelect").simulate("change", {
            target: { value: 1, selectedIndex: 1 }
        });
        expect(renderedModule).toMatchSnapshot();
        expect(renderedModule.find('.return').length).toBe(3);
    });
    it('should show error -  borrow a book when user Not selected', () => {
        Maintain.prototype.setState = jest.fn();
        const renderedModule = mount(<Maintain {...props} />);
        expect(renderedModule).toMatchSnapshot();
        renderedModule.find("button#borrow0").simulate("click");
        expect(renderedModule.find(ErrorAlert).length).toBe(1);
    });

    it('should borrow a book success', () => {

        let user = [];
        const updateUserData = jest.fn(() => {
            user = [{ id: 1, name: 'Sample', books: "1", bookList: [1] }];
            return true;
        });
        const updateBookData = jest.fn(() => {
            user = [{ id: 1, bookTitle: 'Sample', isAvailable: false }];
            return true;
        })
        Maintain.prototype.setState = jest.fn();

        const renderedModule = mount(<Maintain {...props} updateUserData={updateUserData} updateBookData={updateBookData} />);
        renderedModule.find("#userNameSelect").simulate("change", {
            target: { value: 1, selectedIndex: 1 }
        });
        expect(renderedModule).toMatchSnapshot();
        renderedModule.find("button#borrow0").simulate("click");
        setTimeout(function () { expect(renderedModule.find("button#borrow0").length).toBe(0); }, 3000);
    });

    it('should show error - borrow a book when user cross his limit', () => {
        Maintain.prototype.setState = jest.fn();
        props.userInfo = [{ id: 1, name: "sample", books: "1,2", bookList: ["1", "2"] }]
        const renderedModule = mount(<Maintain {...props} />);
        expect(renderedModule).toMatchSnapshot();
        renderedModule.find("button#borrow0").simulate("click");
        expect(renderedModule.find(ErrorAlert).length).toBe(1);
    });


    it('should return a book success', () => {

        props.userInfo = [{ id: 1, name: "sample", books: "1,2", bookList: ["1", "2"] }];
        let user = [];
        const updateUserData = jest.fn(() => {
            user = [{ id: 1, name: 'Sample', books: "1", bookList: [1] }];
            return true;
        });
        const updateBookData = jest.fn(() => {
            user = [{ id: 1, bookTitle: 'Sample', isAvailable: false }];
            return true;
        })
        Maintain.prototype.setState = jest.fn();

        const renderedModule = mount(<Maintain {...props} updateUserData={updateUserData} updateBookData={updateBookData} />);
        renderedModule.find("#userNameSelect").simulate("change", {
            target: { value: 1, selectedIndex: 1 }
        });


        setTimeout(function () {
            renderedModule.find("button#borrowList0").simulate("click");
            expect(renderedModule.find("button#borrowList0").length).toBe(0);
        }, 3000);
    });
});