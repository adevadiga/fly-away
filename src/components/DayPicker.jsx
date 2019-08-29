import React from 'react';
import * as dateFns from 'date-fns';
import {getSessionKeyForFlightQuery, fetchAllFlights} from "../service/RapidApi"
import DateCell from "./DateCell";
import "./calendar.css";

const MonthHeader = ({month, onPrevMonth, onNextMonth}) => {
    const dateFormat = "LLL yyyy";
    return (
        <div className="header row">
            <div className="col col-start">
                <div className="icon" onClick={onPrevMonth}>
                    chevron_left
                </div>
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

const CalendarDates = ({month, selectedDate}) => {
    //const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(month);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;

        const isDisabled = !dateFns.isSameMonth(day, monthStart);
        let dateCell;
        if (isDisabled) {
            dateCell = <div className="col cell"/>;
        } else {
            dateCell = <DateCell day={day} selectedDate={selectedDate} monthStart={monthStart}/>;
        }


        days.push(
            dateCell
            // <div
            // className={`col cell ${
            //     !dateFns.isSameMonth(day, monthStart)
            //     ? "disabled"
            //     : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            // }`}
            // key={day}
            // onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
            // >
            // <div className="number">{formattedDate}</div>
            // <div className="fare">100</div>
            // </div>
            // <DateCell day={day} selectedDate={selectedDate} monthStart={monthStart}/>
        );
        day = dateFns.addDays(day, 1);
        }
        rows.push(
        <div className="row" key={day}>
            {days}
        </div>
        );
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

    componentDidMount() {
    //    const key = getSessionKey();
    //    key.then(v => {
    //     fetchAllFlights(v);
    //    });
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
      
    render() {
        const {currentMonth, selectedDate} = this.state;
        return (
            <div className="calendar">
                <MonthHeader month={currentMonth} onPrevMonth={this.handlePrevMonthClick} onNextMonth={this.handleNextMonthClick}/>
                <WeekDays month={currentMonth}/>
                <CalendarDates month={currentMonth} selectedDate={selectedDate}/>
            </div>
        );
    }
}

export default DayPicker;

