import React from 'react';
import { instanceOf, func } from 'prop-types';
import {format} from 'date-fns';

const CalendarHeader = ({month, onPrevMonth, onNextMonth}) => {
    const dateFormat = 'LLL yyyy';
    const isPrevMonth = month.getMonth() <= new Date().getMonth();
    return (
        <div className='header row'>
            <div className='col col-start'>
               {!isPrevMonth && <div className='icon' onClick={onPrevMonth}>
                    chevron_left
                </div>
               }
            </div>
            <div className='col col-center heading'>
                <span>{format(month, dateFormat)}</span>
            </div>
            <div className='col col-end' onClick={onNextMonth}>
                <div className='icon'>chevron_right</div>
            </div>
        </div>
    );
}

CalendarHeader.propTypes = {
    month: instanceOf(Date).isRequired,
    onPrevMonth: func.isRequired,
    onNextMonth: func.isRequired
};

export default CalendarHeader;