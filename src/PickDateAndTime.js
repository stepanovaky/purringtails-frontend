import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from "date-fns";
import differenceInDays from "date-fns/differenceInDays";

function PickDateAndTime(props) {
  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);
  const [daysOfService, setDaysOfService] = useState();

  const dateRangeInDays = differenceInDays(endDate, startDate);
  console.log(dateRangeInDays);
  const displayingDaysOfService = (dateRange) => {
    if (dateRange <= 0) {
      setDaysOfService(1);
    } else if (dateRange === 1) {
      setDaysOfService(1);
    } else {
      setDaysOfService(dateRange);
    }
  };

  useEffect(() => {
    displayingDaysOfService(dateRangeInDays);
  }, [dateRangeInDays]);

  const modifiedEndDate = (date) => {
    setStartDate(date);
    setEndDate(addDays(date, 1));
  };

  const serviceAppropriateCalendar = () => {
    if (props.service === "Walk" || props.service === "Drop In") {
      return (
        <DatePicker
          minDate={new Date()}
          maxDate={addDays(new Date(), 100)}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          placeholderText="Start"
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      );
    } else if (props.service === "Boarding" || props.service === "Sitting") {
      return (
        <div className="date-range">
          <DatePicker
            minDate={new Date()}
            maxDate={addDays(new Date(), 100)}
            selected={startDate}
            onChange={(date) => modifiedEndDate(date)}
            selectsStart
            showTimeSelect
            placeholderText="Start"
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
            onChange={(date) => setEndDate(date)}
            selectsEnd
            showTimeSelect
            placeholderText="End"
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="Time"
            startDate={startDate}
            endDate={endDate}
            // minDate={startDate}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      );
    }
  };

  return (
    <div className="date-and-time">
      <h2>Pick Date and Time</h2>
      {serviceAppropriateCalendar()}
      <p>
        You chose {props.service} on{" "}
        {startDate !== null ? format(startDate, "MM/dd") : null}
        {endDate !== null
          ? props.service === "Boarding" || props.service === "Sitting"
            ? ` until ${format(endDate, "MM/dd")}`
            : null
          : null}
        {endDate !== null
          ? props.service === "Boarding" || props.service === "Sitting"
            ? ` for ${daysOfService}`
            : null
          : null}{" "}
        {(props.service === "Boarding" && daysOfService === 1) ||
        (props.service === "Sitting" && daysOfService === 1)
          ? `day`
          : null}
        {daysOfService >= 2 ? `days` : null}{" "}
      </p>
    </div>
  );
}

export default PickDateAndTime;
