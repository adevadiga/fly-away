import React from 'react';

import './flightSearch.css';

const SelectRoute = ({routeDetails, onRouteSelect}) => {
    const onSelect = (event) => {
        const {
            name,
            value
        } = event.target;
        let updatedRoute = Object.assign({}, routeDetails, {
            [name]: value
        });

        //Basic validation
        if (routeDetails.from === routeDetails.to) {
            updatedRoute = routeDetails;
        }
        onRouteSelect(updatedRoute);
    };

    
    return (
        <>
            <div className="items">
                <label>From: </label>
                <select name="from" value={routeDetails.from} className="select" onChange={onSelect}>
                    <option>SIN-sky</option>
                    <option>KUL-sky</option>
                    <option>SFO-sky</option>
                </select>
            </div>
            <div className="items">
                <label>To: </label>
                <select name="to" value={routeDetails.to} className="select" onChange={onSelect}>
                    <option>SIN-sky</option>
                    <option>KUL-sky</option>
                    <option>SFO-sky</option>
                </select>
            </div>
        </>
    );
}
const FlightSearch = (props) => {
    return (
        <div className="flightSearch">
            <SelectRoute {...props}/>
        </div>
    );
    
};

export default FlightSearch;