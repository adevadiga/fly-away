import React from 'react';
import { string, func, shape } from 'prop-types';

import './flightSearch.css';

const RouteSelector = ({routeDetails, onRouteSelect}) => {
    const handleSelect = (event) => {
        const {
            name,
            value
        } = event.target;
        let updatedRoute = Object.assign({}, routeDetails, {
            [name]: value
        });

        //Basic validation
        // if (routeDetails.from === routeDetails.to) {
        //     updatedRoute = routeDetails;
        // }
        onRouteSelect(updatedRoute);
    };

    
    return (
        <>
            <div className="items">
                <label>From: </label>
                <select name="from" value={routeDetails.from} className="select" onChange={handleSelect}>
                    <option value='SIN-sky'>SIN</option>
                    <option value='KUL-sky'>KUL</option>
                    <option value='SFO-sky'>SFO</option>
                </select>
            </div>
            <div className="items">
                <label>To: </label>
                <select name="to" value={routeDetails.to} className="select" onChange={handleSelect}>
                    <option value='SIN-sky'>SIN</option>
                    <option value='KUL-sky'>KUL</option>
                    <option value='SFO-sky'>SFO</option>
                </select>
            </div>
        </>
    );
}
const FlightSearch = ({routeDetails, onRouteSelect}) => {
    return (
        <div className="flightSearch">
            <RouteSelector
                routeDetails={routeDetails}
                onRouteSelect={onRouteSelect}
                />
        </div>
    );
    
};

FlightSearch.propTypes = {
    onRouteSelect: func.isRequired,
    routeDetails: shape({
        from: string,
        to: string
    }),
};

RouteSelector.propTypes = {
    onRouteSelect: func.isRequired,
    routeDetails: shape({
        from: string,
        to: string
    }),
};

export default FlightSearch;