import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import DeleteButton from "./DeleteButton";
import ErrorBoundary from "./ErrorBoundary";
import "./ScheduledServices.css";

function ScheduledServices(props) {
  // console.log(props);
  //fetch dates specific to user, check if the time is after/before the current time, if after display
  //if before, hide
  //if nothing 'nothing scheduled so far'
  //attach a deletion link to all displayed dates
  //OPTIONAL attach reschedule link

  const [scheduled, setScheduled] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  // console.log(scheduled);

  const handleDelete = (id) => {
    console.log(id);
    const newScheduleList = scheduled.filter((schedule) => console.log(id));
    setScheduled(newScheduleList);
  };

  const mapScheduled = scheduled.map((schedule) => {
    // console.log(schedule);
    if (new Date(schedule.scheduled_date).getTime() > new Date().getTime()) {
      return (
        <li key={`${schedule.scheduled_id}`}>
          <p className="scale-up-center">
            <span className="scheduled-item">{schedule.scheduled_type}</span>
          </p>
          <p>
            {schedule.scheduled_end_date !== "" ? <span>From</span> : null}{" "}
            {schedule.scheduled_date == undefined
              ? null
              : format(
                  new Date(schedule.scheduled_date),
                  "MMMM d, yyyy h:mm aa"
                )}
          </p>
          {schedule.scheduled_end_date !== "" ? (
            <p>
              until{" "}
              {format(
                new Date(schedule.scheduled_end_date),
                "MMMM d, yyyy h:mm aa"
              )}
            </p>
          ) : null}
          <ErrorBoundary>
            <DeleteButton
              setScheduled={setScheduled}
              scheduleId={schedule.scheduled_id}
              scheduled={scheduled}
            />
          </ErrorBoundary>
        </li>
      );
    }
  });

  useEffect(() => {
    fetchScheduledDates();
  }, []);

  useEffect(() => {}, [scheduled]);

  const fetchScheduledDates = async () => {
    const authToken = sessionStorage.getItem("authToken");

    try {
      const fetchInfo = await fetch(
        "https://purringtails-backend.herokuapp.com/api/schedule",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            user: `${props.userId}`,
          },
        }
      );
      const scheduleInfo = await fetchInfo.json();
      const response = fetchInfo;
      setScheduled(scheduleInfo);
      if (response.status === 200) {
        const fetchResponse = await response.json();
      } else if (response.status === 400) {
        const error = await response.json();
        setShowMessage(true);
        setErrorMessage(error.error);
      }
    } catch (err) {}
  };

  return (
    <div className="scheduled">
      <h3>Scheduled Services</h3>
      <p>{mapScheduled.length == 0 ? "No future services scheduled" : null}</p>
      <ul className="scheduled-list">{mapScheduled}</ul>
    </div>
  );
}

export default ScheduledServices;
