import React from 'react';
import { mount } from 'enzyme';
import FlightSearch from '../../../components/flightSearch/FlightSearch';

describe('FlightSearch', () => {
    describe('Rendering', () => {
      test('should render', () => {
        const mockOnRouteSelect = jest.fn(route => route);
        const routeDetails = {
            'from': 'KA',
            'to': 'KB'
        };
        const wrapper = mount(
          <FlightSearch onRouteSelect={mockOnRouteSelect} routeDetails={routeDetails}/>
        );
        expect(wrapper.find('.items').length).toBe(2);
      });

      test('select should render proper value', () => {
        const mockOnRouteSelect = jest.fn(route => route);
        const routeDetails = {
            'from': 'SIN-sky',
            'to': 'KUL-sky'
        };
        const wrapper = mount(
          <FlightSearch onRouteSelect={mockOnRouteSelect} routeDetails={routeDetails}/>
        );
        expect(wrapper.find('.items').length).toBe(2);

        wrapper.find('select[name="from"]').simulate('change', {
          target: {
            name: 'from',
            value : 'SFO-sky'
          }
        });
        expect(mockOnRouteSelect.mock.calls.length).toBe(1);
        expect(mockOnRouteSelect.mock.calls[0][0]).toStrictEqual({
            'from': 'SFO-sky',
            'to': 'KUL-sky'
        });

        wrapper.find('select[name="to"]').simulate('change', {
            target: {
              name: 'to',
              value : 'SIN-sky'
            }
        });
        expect(mockOnRouteSelect.mock.calls[1][0]).toStrictEqual({
            'from': 'SIN-sky',
            'to': 'SIN-sky'
        });
      });
    });
});
