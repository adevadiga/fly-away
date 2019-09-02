import React, {useState, useEffect} from 'react';
import LoadingPlaceholder from './LoadingPlaceholder';
import {getMinPriceForDay} from '../../service/FlightPriceCalculator';

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
            setFare('--');
        });
    }, [date, routeDetails]);

    return (
        <>
        {isLoading && <LoadingPlaceholder/>}
        {!isLoading && <div className='flightFare'>{fare}</div>}
        </>
    );
};

export default DayFlightPrice;