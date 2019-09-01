import React from 'react';
import { shallow } from 'enzyme';

import DayPicker from '../../../components/flightDisplay/DayPicker';

describe('DayPicker', () => {

    let wrapper, route;
    beforeEach(() => {
        route = {
            'from': 'A',
            'to': 'B'
        };
      wrapper = shallow(<DayPicker routeDetails={route}/>);
    });

    afterEach(() => {
      wrapper.unmount();
      wrapper = null;
    });

    test('should render a calendar', () => {
        expect(wrapper.find('CalendarHeader').length).toBe(1);
        expect(wrapper.find('CalendarWeeks').length).toBe(1);
        expect(wrapper.find('CalendarDates').length).toBe(1);
    });


    describe('Passing in custom props', () => {

        test('should render a CalendarHeader component with props', () => {
            const today = new Date();
            wrapper.instance().setState({
                currentMonth: today
            });
            expect(wrapper.find('CalendarHeader').prop('month')).toBe(today);
        });

        test('should render a CalendarWeeks component with props', () => {
            const today = new Date();
            wrapper.instance().setState({
                currentMonth: today
            });
            expect(wrapper.find('CalendarWeeks').prop('month')).toBe(today);
        });

        test('should render a CalendarDates component with props', () => {
            const today = new Date();
            wrapper.instance().setState({
                currentMonth: today
            });
            expect(wrapper.find('CalendarDates').prop('routeDetails')).toBe(route);
            expect(wrapper.find('CalendarDates').prop('month')).toBe(today);
        });
    });

    describe('instance method test', () => {
        test('handleNextMonthClick should advanced current month', () => {
            const today = new Date();
            wrapper.instance().setState({
                currentMonth: today
            });
            wrapper.instance().handleNextMonthClick();
            wrapper.update();
            expect(wrapper.find('CalendarDates').prop('month').getMonth()).toBe(today.getMonth() + 1);
        });

        test('handlePrevMonthClick should advanced current month', () => {
            const today = new Date();
            wrapper.instance().setState({
                currentMonth: today
            });
            wrapper.instance().handlePrevMonthClick();
            wrapper.update();
            expect(wrapper.find('CalendarDates').prop('month').getMonth()).toBe(today.getMonth() - 1);
        });
    });
});