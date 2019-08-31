import React from 'react';
import * as dateFns from 'date-fns';
//import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameMonth, addMonths, subMonths} from 'date-fns';

import DateCell from "./DateCell";
import "./calendar.css";

const MonthHeader = ({month, onPrevMonth, onNextMonth}) => {
    const dateFormat = "LLL yyyy";
    const isPrevMonth = month.getMonth() <= new Date().getMonth();
    return (
        <div className="header row">
            <div className="col col-start">
               {!isPrevMonth && <div className="icon" onClick={onPrevMonth}>
                    chevron_left
                </div>
               }
            </div>
            <div className="col col-center heading">
                <span>{dateFns.format(month, dateFormat)}</span>
            </div>
            <div className="col col-end" onClick={onNextMonth}>
                <div className="icon">chevron_right</div>
            </div>
        </div>
    );
}

const WeekDays = ({month}) => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = dateFns.startOfWeek(month);

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col col-center" key={i}>
                {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
            </div>
        );
    }

    return <div className="days row">{days}</div>;
}

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
            const isDisabled = !dateFns.isSameMonth(day, monthStart);
            days.push(
                isDisabled ? <div key={day} className="col cell"/> 
                    : <DateCell key={day} day={day} selectedDate={selectedDate} routeDetails={routeDetails} monthStart={monthStart} onDateClick={onDateClick}/>
            );
            day = dateFns.addDays(day, 1);
        }
        rows.push(<div className="row" key={day}>{days}</div>);

        days = [];
    }
    return <div className="body">{rows}</div>;
}

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
          currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };
    
    handlePrevMonthClick = () => {
        this.setState({
          currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    handleDateClick = (date) => {
        alert(`Date Clicked ${date}`)
    }
      
    render() {
        const {currentMonth, selectedDate} = this.state;
        const {routeDetails} = this.props;
        return (
            <div className="calendar">
                <MonthHeader
                    month={currentMonth}
                    onPrevMonth={this.handlePrevMonthClick}
                    onNextMonth={this.handleNextMonthClick}/>

                <WeekDays month={currentMonth}/>

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

