import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, setHours, setMinutes } from "date-fns";
import differenceInDays from "date-fns/differenceInDays";
import ConfirmationPage from "./ConfirmationPage";

function PickDateAndTime(props) {
  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);
  const [daysOfService, setDaysOfService] = useState();

  const dateRangeInDays = differenceInDays(endDate, startDate);
  const displayingDaysOfService = (dateRange) => {
    if (dateRange <= 0) {
      setDaysOfService(1);
    } else if (dateRange === 1) {
      setDaysOfService(1);
    } else {
      setDaysOfService(dateRange);
    }
  };

  const formatDate = (date, min = 0, hour = 0) =>
    format(setHours(setMinutes(date, min), hour), "MMMM d, yyyy h:mm aa");
  const excludeTime = (min, hour) =>
    setHours(setMinutes(new Date(), min), hour);
  const isThereADate = (date) => (date == null ? null : formatDate(date));

  const tomorrow = addDays(new Date(), 1);
  const isItTomorrow = (providedDate) => tomorrow === providedDate;

  console.log(isItTomorrow(tomorrow));

  const matchStartDateToExcludeDates =
    formatDate(tomorrow) != null ? excludeTime(30, 18) : null;
  const matchSelectedDateToExcludeDates = (
    selectedDate,
    serviceDate,
    serviceMin,
    serviceHour
  ) =>
    isThereADate(selectedDate) === formatDate(serviceDate)
      ? excludeTime(serviceMin, serviceHour)
      : null;
  console.log(
    matchSelectedDateToExcludeDates(startDate, new Date(2020, 9, 27), 30, 20)
  );

  const arrayOfExclusion = [
    matchStartDateToExcludeDates,
    matchSelectedDateToExcludeDates(startDate, new Date(2020, 9, 27), 30, 20),
  ];
  console.log(arrayOfExclusion);

  useEffect(() => {
    displayingDaysOfService(dateRangeInDays);
  }, [dateRangeInDays, startDate]);

  const modifiedEndDate = (date) => {
    setStartDate(date);
    setEndDate(addDays(date, 1));
  };

  //psuedo-code:
  //for each date {
  // iterate through the dates to check if they're tomorrow, if tomorrow, push matchstartdatetoexclude dates to arrayofexclusion
  //} else if {
  // all other dates push matchselecteddatetoexcludedates to arrayofexclusion
  //}
  //make sure arrayofexclusion is able to be a list of all excluded datetimes

  const serviceAppropriateCalendar = () => {
    if (props.service === "Walk" || props.service === "Drop In") {
      return (
        <DatePicker
          minDate={tomorrow}
          maxDate={addDays(new Date(), 100)}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          excludeTimes={arrayOfExclusion}
          placeholderText="Start"
          timeFormat="h:mm"
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      );
    } else if (props.service === "Boarding" || props.service === "Sitting") {
      return (
        <div className="date-range">
          <DatePicker
            minDate={tomorrow}
            maxDate={addDays(new Date(), 100)}
            selected={startDate}
            onChange={(date) => modifiedEndDate(date)}
            selectsStart
            showTimeSelect
            placeholderText="Start"
            timeFormat="h:mm"
            timeIntervals={30}
            timeCaption="Time"
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          <br />
          <DatePicker
            minDate={tomorrow}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            showTimeSelect
            placeholderText="End"
            timeFormat="h:mm"
            timeIntervals={30}
            timeCaption="Time"
            startDate={startDate}
            endDate={endDate}
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
        {startDate !== null
          ? `You chose ${props.service} on ${format(
              startDate,
              "MM/dd"
            )} at ${format(startDate, "h:mm aa")}`
          : null}
        {endDate !== null
          ? props.service === "Boarding" || props.service === "Sitting"
            ? ` until ${format(endDate, "MM/dd")} at ${format(
                endDate,
                "h:mm aa"
              )}`
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
      <ConfirmationPage
        service={props.service}
        startDate={startDate}
        endDate={endDate}
        daysOfService={daysOfService}
      />
    </div>
  );
}

export default PickDateAndTime;
