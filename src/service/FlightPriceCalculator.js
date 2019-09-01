import {getSessionKeyForFlightQuery, pollSessionResults} from "./RapidApi";

export const calculateMinPrice = (flightDetails) => {
    let minPrice = Number.MAX_SAFE_INTEGER;
    for (const details of flightDetails) {
        minPrice = details.PricingOptions
            .reduce((accumulator, value) => Math.min(accumulator, value.Price), minPrice);
    }
    return minPrice === Number.MAX_SAFE_INTEGER ? 0 : minPrice;
}

export async function getMinPriceForDay(date, routeDetails) {
    const sessionKey = await getSessionKeyForFlightQuery(date, routeDetails);
    const allFlightDetailsForDay = await pollSessionResults(sessionKey);
    return calculateMinPrice(allFlightDetailsForDay);
}



