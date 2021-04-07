import React from 'react';
import { mount, shallow } from 'enzyme';
import Home from '../../../src/components/Home';


describe('Home page Tests', () => {
    let props;
    let useEffect;
    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
        props = {
            loanInfo: {},
            bookInfo: {},
            updateUserInfo: jest.fn(),
            updateBookInfo: jest.fn()
        }
        useEffect = jest.spyOn(React, "useEffect");
        mockUseEffect(); // 2 times
        mockUseEffect();
    });

    it('should render Home Component', () => {
        const renderedModule = shallow(<Home {...props} />);
        expect(renderedModule).toMatchSnapshot();
        expect(renderedModule.find('.home-page').length).toBe(1);
    });

});