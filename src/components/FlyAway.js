import React, {useState} from 'react';
import FlightSearch from './flightSearch/FlightSearch';
import DayPicker from './flightDisplay/DayPicker';
import '../app.css';

const FlyAway = () => {
    const [routeDetails, setRouteDetails] = useState({
        'from': 'SIN-sky',
        'to': 'KUL-sky'
    });
    return (
        <div className='flyAway'>
            <div className='search'>
                <FlightSearch
                    routeDetails={routeDetails}
                    onRouteSelect={setRouteDetails}/>
            </div>
            <div className='dayPicker'>
                <DayPicker routeDetails={routeDetails}/>
            </div>
        </div>
    );
    
};

export default FlyAway;