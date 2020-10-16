import React from "react";
import { AsYouType } from "libphonenumber-js";

function UserInfo() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="user-info" onSubmit={handleSubmit}>
      <form className="user-info">
        <label>
          First Name
          <input
            type="text"
            placeholder="First Name"
            name="user-first-name"
            required
          />
        </label>
        <label>
          Last Name
          <input type="text" placeholder="Last Name" name="user-Last-name" />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="email@place.com"
            name="user-email"
            required
          />
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            placeholder="(000) 000-0000"
            name="user-phone"
            required
          />
        </label>
        <label>
          Address
          <input
            type="text"
            placeholder="Street Address"
            name="user-address-line-1"
            required
          />
          <input
            type="text"
            placeholder="Street Address Line 2"
            name="user-address-line-2"
          />
          <input type="text" placeholder="City" name="user-city" />
          <input type="Postal/Zip Code" name="user-zip" />
          please select country
        </label>
      </form>
      name email phone number address
    </div>
  );
}

export default UserInfo;
