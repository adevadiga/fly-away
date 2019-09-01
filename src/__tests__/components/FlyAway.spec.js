import React from 'react';
import { shallow } from 'enzyme';
import FlyAway from '../../components/FlyAway';


describe('FlyAway', () => {
    test('should render Search & Calendar component', () => {
        const wrapper = shallow(<FlyAway/>);
        expect(wrapper).toBeDefined();
        expect(wrapper.find('FlightSearch').length).toBe(1);
        expect(wrapper.find('DayPicker').length).toBe(1);
    })
});