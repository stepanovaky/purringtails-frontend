import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from 'date-fns';

function PickDateAndTime(props) {

    const [startDate, setStartDate] = useState(new Date());

    const tomorrow = new Date();

    const [endDate, setEndDate] = useState(tomorrow.setDate(tomorrow.getDate() +1));
    const [daysOfService, setDaysOfService ] = useState();

    const changeBothStartAndEndDate = (date) => {
        setStartDate(date);
        setEndDate(date.setDate(date.getDate() + 1))
    }

    

    const dateRangeInMilliseconds = (new Date(endDate).getTime()) - (new Date(startDate).getTime());
    const dateRangeInDays = Math.floor(dateRangeInMilliseconds / (24*60*60*1000));
    console.log(dateRangeInDays)
    const displayingDaysOfService = (dateRange) => {
        if (dateRange === 0) {
            setDaysOfService(1)
        } else if (dateRange === 1) {
            setDaysOfService(1)
        } else {
            setDaysOfService(dateRange)
        }
    }

    useEffect(() => {
        displayingDaysOfService(dateRangeInDays)
        endDateChangesWhenStartDateChanges()
    }, [startDate])

    const endDateChangesWhenStartDateChanges = () => {
        setEndDate(startDate.setDate(startDate.getDate() + 1))
    }


   
    

    const serviceAppropriateCalendar = () => {
        if (props.service === 'Walk' || props.service === 'Drop In') {
            return <DatePicker 
            minDate={new Date()}
            maxDate={addDays(new Date(), 100)}
                        selected={startDate} 
                        onChange={date => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                     />
        } else if (props.service === 'Boarding' || props.service === 'Sitting') {
            return (<div className="date-range">
                <DatePicker
                minDate={new Date()}
                maxDate={addDays(new Date(), 100)}
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        timeCaption="Time"
        startDate={startDate}
        endDate={endDate}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <br />
      <DatePicker
      minDate={new Date()}
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        timeCaption="Time"
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="MMMM d, yyyy h:mm aa"
      />

            </div>)
        }
    }

    return(
        <div className="date-and-time">
            <h2>Pick Date and Time</h2>
            {serviceAppropriateCalendar()}
            <p>You chose {props.service} on {format(startDate, 'MM/dd')}{(props.service === 'Boarding' || props.service === 'Sitting') ? ` until ${format(endDate, 'MM/dd')}`:null}{(props.service === 'Boarding' || props.service === 'Sitting') ? ` for ${daysOfService}`:null} {((props.service === 'Boarding' && daysOfService === 1) || (props.service === 'Sitting' && daysOfService === 1)) ? `day`:null}{(daysOfService >= 2) ? `days`:null} </p>

        </div>
    )
}

export default PickDateAndTime;


