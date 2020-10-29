import React from "react";

function DeleteButton(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDeleteSchedule(props.scheduleId);
  };

  const fetchDeleteSchedule = async (id) => {
    const authToken = sessionStorage.getItem("authToken");
    try {
      const fetchRequest = await fetch("http://localhost:8000/api/schedule", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          sched: id,
        },
      });
      console.log(props.scheduled);
      const scheduled = props.scheduled;

      const newScheduleList = scheduled.filter(
        (schedule) => schedule.scheduled_id != id
      );
      console.log(newScheduleList);
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
            value="Delete"
          />
        </label>
      </form>
    </div>
  );
}

export default DeleteButton;
