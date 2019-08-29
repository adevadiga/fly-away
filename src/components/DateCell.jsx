import React, {useState, useEffect} from 'react';
import * as dateFns from 'date-fns';
import {getSessionKeyForFlightQuery, fetchAllFlights} from "../service/RapidApi"
import LoadingPlaceholder from "./LoadingPlaceholder";

export const getCheapestPriceForDay = (flightDetails) => {
    let minPrice = Number.MAX_SAFE_INTEGER;
    for (const details of flightDetails) {
        minPrice = details.PricingOptions
            .reduce((accumulator, value) => Math.min(accumulator, value.Price), minPrice);
    }
    return minPrice;
}

async function getCheapestFlightPrice(day) {
    const sessionKey = await getSessionKeyForFlightQuery(day);
    const allFlightDetailsForDay = await fetchAllFlights(sessionKey);
    return getCheapestPriceForDay(allFlightDetailsForDay);
}
export default function DateCell({day, selectedDate}) {
    const [fare, setFare] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCheapestFlightPrice(day).then(fare => {
            setFare(fare);
            setIsLoading(false);
        });
    }, [day]);

    return (
        <div
            className={`col cell ${dateFns.isSameDay(day, selectedDate) ? "selected" : ""}`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(day))}
            >
            <div className="number">{dateFns.format(day, "d")}</div>
            {isLoading && <LoadingPlaceholder/>}
            {!isLoading && <div className="fare">{fare}</div>}
        </div>
    );
}