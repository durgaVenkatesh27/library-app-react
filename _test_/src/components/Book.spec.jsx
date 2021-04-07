import React from 'react';
import { mount, shallow } from 'enzyme';
import Book from '../../../src/components/Book';
import ShowTable from '../../../src/components/ShowTable';


describe('Book component Tests', () => {
    let props;
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
        }));
    beforeEach(() => {
        props = {
            bookInfo: [{ id: 1, bookTitle: 'Sample', isAvailable: true }],
            updateBookInfo: jest.fn()
        }
    })
    it('should render Book Component', () => {
        const renderedModule = shallow(<Book {...props} />);
        expect(renderedModule).toMatchSnapshot();
    });
    it('should render ShowTable Component', () => {
        const renderedModule = mount(<Book {...props} />);
        expect(renderedModule).toMatchSnapshot();
        expect(renderedModule.find(ShowTable).length).toBe(1);
    });
    it('should add book', () => {
        let book = [];
        const updateBookData = jest.fn(() => {
            book = [{ id: 1, bookTitle: 'Sample', isAvailable: true },
            { id: 1, bookTitle: 'Sample2', isAvailable: true }];
            return true;
        });
        const renderedModule = mount(<Book {...props} updateBookData={updateBookData} />);

        renderedModule.find("#bookName").simulate("change", {
            target: { value: "sample2" }
        });
        renderedModule.find("#addBook").simulate("click");

        expect(renderedModule).toMatchSnapshot();
        expect(renderedModule.find('#bookName').text()).toBe('');
    });
});