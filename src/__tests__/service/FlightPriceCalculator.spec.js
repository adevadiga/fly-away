import { getMinPriceForDay } from '../../service/FlightPriceCalculator';
import * as RapidApi from '../../service/RapidApi';

jest.mock('../../service/RapidApi');

describe('FlightPriceCalculator', () => {
    test('should return minimum price for that day',  async () => {
        const flightFare = [
          {
            PricingOptions:[{
              Price: 6
            }, {
                Price: 8
            }]
          }
        ]
        const route = {
            'from': 'X',
            'to': 'Y'
        };
        RapidApi.getSessionKeyForFlightQuery.mockResolvedValue(Promise.resolve('session-key'));
        RapidApi.pollSessionResults.mockResolvedValue(Promise.resolve(flightFare));
        const minPrice = await getMinPriceForDay(new Date(), route);
        expect(minPrice).toBe(6);
    });
});