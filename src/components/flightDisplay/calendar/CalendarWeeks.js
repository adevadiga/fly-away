import React from 'react';
import { instanceOf } from 'prop-types';
import { format, startOfWeek, addDays } from 'date-fns';

const CalendarWeeks = ({month}) => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(month);

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col col-center" key={i}>
                {format(addDays(startDate, i), dateFormat)}
            </div>
        );
    }

    return <div className="days row">{days}</div>;
}

CalendarWeeks.propTypes = {
    month: instanceOf(Date).isRequired,
};

export default CalendarWeeks;