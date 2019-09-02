import React from 'react';
import { string, func, instanceOf , shape } from 'prop-types';
import * as dateFns from 'date-fns';

import CalendarDateCell from './CalendarDateCell';

const CalendarDates = ({month, selectedDate, routeDetails, onDateClick}) => {
    const monthStart = dateFns.startOfMonth(month);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            const key = `${day.getTime()}${routeDetails.from}${routeDetails.to}`;
            const isDisabled = !dateFns.isSameMonth(day, monthStart);
            days.push(
                isDisabled ? <div key={day} className='col cell'/> 
                    : <CalendarDateCell key={key} day={day} selectedDate={selectedDate} routeDetails={routeDetails} monthStart={monthStart} onDateClick={onDateClick}/>
            );
            day = dateFns.addDays(day, 1);
        }
        rows.push(<div key={day.getTime()} className='row'>{days}</div>);

        days = [];
    }
    return <div className='body'>{rows}</div>;
}

CalendarDates.propTypes = {
    month: instanceOf(Date).isRequired,
    selectedDate: instanceOf(Date).isRequired,
    routeDetails: shape({
        from: string,
        to: string
    }),
    onDateClick: func.isRequired
};


export default CalendarDates;