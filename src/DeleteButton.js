import React from "react";
import "./DeleteButton.css";

function DeleteButton(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDeleteSchedule(props.scheduleId);
  };

  const fetchDeleteSchedule = async (id) => {
    const authToken = sessionStorage.getItem("authToken");
    try {
      const fetchRequest = await fetch(
        `${process.env.REACT_APP_API}/api/schedule`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            sched: id,
          },
        }
      );
      const scheduled = props.scheduled;

      const newScheduleList = scheduled.filter(
        (schedule) => schedule.scheduled_id != id
      );
      props.setScheduled(newScheduleList);
    } catch {}
  };

  return (
    <div className="delete">
      <form className="delete" onSubmit={handleSubmit}>
        <label htmlFor="confirmation">
          <input
            type="submit"
            id={props.scheduleId}
            name="delete"
            value="Cancel"
            className="delete"
          />
        </label>
      </form>
    </div>
  );
}

export default DeleteButton;
