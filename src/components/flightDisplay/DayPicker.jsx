import React from 'react';
import { addMonths, subMonths } from 'date-fns';

import CalendarHeader from './calendar/CalendarHeader';
import CalendarWeeks from './calendar/CalendarWeeks';
import CalendarDates from './calendar/CalendarDates';
import "./dayPicker.css";

class DayPicker extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    };

    constructor(props) {
        super(props);
        this.formatForWeek = "MMMM yyyy";
    }
    
    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    };
    
    handleNextMonthClick = () => {
        this.setState({
          currentMonth: addMonths(this.state.currentMonth, 1)
        });
    };
    
    handlePrevMonthClick = () => {
        this.setState({
          currentMonth: subMonths(this.state.currentMonth, 1)
        });
    };

    handleDateClick = (date) => {
        console.log(`Date Clicked ${date}`)
    }
      
    render() {
        const {currentMonth, selectedDate} = this.state;
        const {routeDetails} = this.props;
        return (
            <div className="calendar">
                <CalendarHeader
                    month={currentMonth}
                    onPrevMonth={this.handlePrevMonthClick}
                    onNextMonth={this.handleNextMonthClick}/>

                <CalendarWeeks month={currentMonth}/>

                <CalendarDates
                    month={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={this.handleDateClick}
                    routeDetails={routeDetails}/>
            </div>
        );
    }
}

export default DayPicker;

