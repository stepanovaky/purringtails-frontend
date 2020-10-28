import React from "react";

function ScheduledServices() {
  //fetch dates specific to user, check if the time is after/before the current time, if after display
  //if before, hide
  //if nothing 'nothing scheduled so far'
  //attach a deletion link to all displayed dates
  //OPTIONAL attach reschedule link

  return (
    <div className="scheduled">
      <p>Nothing scheduled so far!</p>
    </div>
  );
}

export default ScheduledServices;
