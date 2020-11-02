import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getYear,
  addDays,
  format,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
  getMonth,
  getDate,
} from "date-fns";
import differenceInDays from "date-fns/differenceInDays";
import { useHistory } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Flash from "./FlashMessage";

function PickDateAndTime(props) {
  const tomorrow = addDays(new Date(), 1);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();
  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);
  const [daysOfService, setDaysOfService] = useState();
  const [scheduled, setScheduled] = useState([]);

  const handleNotAvailableTimeSlot = (error) => {
    setErrorMessage(error);
  };

  const destructuredEndDates = scheduled.map((schedule) => [
    getYear(new Date(schedule.scheduled_end_date)),
    getMonth(new Date(schedule.scheduled_end_date)),
    getDate(new Date(schedule.scheduled_end_date)),
    getHours(new Date(schedule.scheduled_end_date)),
    getMinutes(new Date(schedule.scheduled_end_date)),
  ]);

  const destructuredDates = scheduled.map((schedule) => [
    getYear(new Date(schedule.scheduled_date)),
    getMonth(new Date(schedule.scheduled_date)),
    getDate(new Date(schedule.scheduled_date)),
    getHours(new Date(schedule.scheduled_date)),
    getMinutes(new Date(schedule.scheduled_date)),
  ]);

  const allDestructuredDates = destructuredDates.concat(destructuredEndDates);

  const excludeTime = (min, hour) =>
    setHours(setMinutes(new Date(), min), hour);

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

  useEffect(() => {
    displayingDaysOfService(dateRangeInDays);
    fetchScheduledDates();
  }, [dateRangeInDays, startDate]);

  const modifiedEndDate = (date) => {
    setStartDate(date);
    setEndDate(addDays(date, 2));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const scheduledInfo = {
      userName: props.userName,
      userId: props.userId,
      service: props.service,
      startDate: startDate,
      endDate: endDate,
      daysOfService: daysOfService,
    };
    history.push("/confirmation", {
      scheduledInfo,
    });
  };

  const fetchScheduledDates = async () => {
    const authToken = sessionStorage.getItem("authToken");

    try {
      const fetchInfo = await fetch("http://localhost:8000/api/schedule", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          user: `${props.userId}`,
        },
      });
      const scheduleInfo = await fetchInfo.json();
      setScheduled(scheduleInfo);
    } catch (err) {
      console.log(err);
    }
  };

  const notAvailable = [];

  const option =
    startDate != null ? startDate : setHours(setMinutes(tomorrow, 0), 10);

  const unavailableTimeSlots = allDestructuredDates.map((day) => {
    if (getYear(option) === day[0]) {
      if (getMonth(option) === day[1]) {
        if (getDate(option) === day[2]) {
          notAvailable.push(excludeTime(day[4], day[3]));
        }
      }
    }
  });

  const serviceAppropriateCalendar = () => {
    if (props.service === "Walk" || props.service === "Drop In") {
      return (
        <ErrorBoundary>
          <DatePicker
            minDate={tomorrow}
            maxDate={addDays(new Date(), 100)}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            excludeTimes={notAvailable}
            placeholderText="Start"
            timeFormat="h:mm"
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy "
          />
        </ErrorBoundary>
      );
    } else if (props.service === "Boarding" || props.service === "Sitting") {
      return (
        <div className="date-range">
          <ErrorBoundary>
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
              dateFormat="MMMM d, yyyy "
            />
          </ErrorBoundary>
          <br />
          <ErrorBoundary>
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
              dateFormat="MMMM d, yyyy "
            />
          </ErrorBoundary>
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
      <ErrorBoundary>
        {showMessage && (
          <div>
            <Flash message={errorMessage} />
          </div>
        )}
      </ErrorBoundary>
      <div className="confirmation">
        <form className="confirmation" onSubmit={handleSubmit}>
          <label htmlFor="confirmation">
            <input
              type="submit"
              id="confirmation"
              name="confirmation"
              value="Confirm"
            />
          </label>
        </form>
      </div>
    </div>
  );
}

export default PickDateAndTime;
