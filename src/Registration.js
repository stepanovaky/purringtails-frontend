import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Flash from "./FlashMessage";
import { useHistory } from "react-router-dom";

function Registration() {
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const handleSubmitRegistration = async (event) => {
    event.preventDefault();
    const userName = event.target["user_name"].value;
    const userEmail = event.target["user_email"].value;
    const userPassword = event.target["user_password"].value;
    const registerUserName = window.btoa(`${userName}`);
    const authToken = window.btoa(`${userEmail}:${userPassword}`);
    const newUser = { givenName: registerUserName, authToken: authToken };
    const userPasswordConfirmation =
      event.target["user_password_confirmation"].value;
    if (userPassword != userPasswordConfirmation) {
      setShowMessage(true);
      setErrorMessage("Passwords do not match");
    } else {
      const fetchUser = await fetch("http://localhost:8000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const response = await fetchUser;
      console.log(response);
      if (response.status === 201) {
        history.push("/login");
      }
    }
  };
  return (
    <div className="registration">
      <form className="registration" onSubmit={handleSubmitRegistration}>
        <label htmlFor="user_name">
          {" "}
          Name:
          <input type="text" name="user_name" id="user_name" required />
        </label>
        <label htmlFor="user_email">
          {" "}
          Email:
          <input type="email" name="user_email" id="user_email" required />
        </label>
        <label htmlFor="user_password">
          Password:
          <input
            type="password"
            name="user_password"
            id="user_password"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
        </label>
        <label htmlFor="user_password_confirmation">
          Confirm Password:
          <input
            type="password"
            name="user_password_confirmatin"
            id="user_password_confirmation"
            required
          />
        </label>
        {showMessage && (
          <div>
            <Flash message={errorMessage} />
          </div>
        )}
        <label htmlFor="submit_registration">
          <input
            type="submit"
            name="submit_registration"
            id="submit_registration"
            value="Submit"
          />
        </label>
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}

export default Registration;
