import React from 'react';
import { isSameDay, isBefore, format } from 'date-fns';
import DayFlightPrice from '../DayFlightPrice';

export const dateClick = (onDateClick, date) => {
    return () => onDateClick(date);
}
export default function CalendarDateCell({day, selectedDate, routeDetails, onDateClick}) {
    const today = new Date();
    today.setHours(0,0,0,0); 
    const showFlightPrice = !isBefore(day, today);

    return (
        <div
            className={`col cell ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
            key={day}
            onClick={dateClick(onDateClick, day)}
            >
            <div className='number'>{format(day, 'd')}</div>
            {showFlightPrice && <DayFlightPrice date={day} routeDetails={routeDetails}/>}
        </div>
    );
}