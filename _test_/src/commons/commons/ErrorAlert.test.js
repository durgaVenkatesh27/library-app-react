import React from 'react';
import { shallow } from 'enzyme';
import ErrorAlert from '../../../../src/commons/ErrorAlert';


describe('Error Alert Tests', () => {
    let props;
    beforeEach(() => {
        props = {
            errorMessage: "Some error!!!",
            errorSeverity: 'error'
        }
    });

    it('should render Library app error Component', () => {
        const renderedModule = shallow(< ErrorAlert {...props}
        />);
        expect(renderedModule).toMatchSnapshot(); expect(renderedModule.find('.custom-alert').length).toBe(1); expect(renderedModule.find('.custom-alert').text()).toEqual('Some error!!!');
    });
});