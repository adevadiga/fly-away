import React, {useState, useEffect} from 'react';
import LoadingPlaceholder from "./LoadingPlaceholder";
import {getMinPriceForDay} from '../../service/FlightPriceCalculator';

/*export const getCheapestPriceForDay = (flightDetails) => {
    let minPrice = Number.MAX_SAFE_INTEGER;
    for (const details of flightDetails) {
        minPrice = details.PricingOptions
            .reduce((accumulator, value) => Math.min(accumulator, value.Price), minPrice);
    }
    return minPrice === Number.MAX_SAFE_INTEGER ? 0 : minPrice;
}

async function getCheapestFlightPrice(date, routeDetails) {
    const sessionKey = await getSessionKeyForFlightQuery(date, routeDetails);
    const allFlightDetailsForDay = await pollSessionResults(sessionKey);
    return getCheapestPriceForDay(allFlightDetailsForDay);
}*/

const DayFlightPrice = ({date, routeDetails}) => {
    const [fare, setFare] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMinPriceForDay(date, routeDetails).then(fare => {
            setFare(fare);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
            setFare("--");
        });
    }, [date, routeDetails]);

    return (
        <>
        {isLoading && <LoadingPlaceholder/>}
        {!isLoading && <div className="flightFare">{fare}</div>}
        </>
    );
};

export default DayFlightPrice;