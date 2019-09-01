import React from 'react';
import { mount } from 'enzyme';
import * as FlightPriceCalculator from '../../../service/FlightPriceCalculator';
import DayFlightPrice from '../../../components/flightDisplay/DayFlightPrice';

jest.mock('../../../service/FlightPriceCalculator');
// const mockSetState = jest.fn();

// jest.mock('react', () => ({
//     useState: initial => [initial, mockSetState]
// }));

describe('DayFlightPrice', () => {

    test('should render Loading component', () => {
        FlightPriceCalculator.getMinPriceForDay.mockResolvedValue(16);

        const routeDetails = {
            'from': 'KA',
            'to': 'KB'
        };
        const wrapper = mount(
          <DayFlightPrice date={new Date()} routeDetails={routeDetails}/>
        );
        expect(wrapper.find('.lds-ellipsis').length).toBe(1);
    });

    // test('works with async/await', async () => {
    //     expect.assertions(1);
    //     const data = await user.getUserName(4);
    //     expect(data).toEqual('Mark');
    //   });
      
});