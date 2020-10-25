import React, { useEffect } from "react";

function LoginAuth(props) {
  useEffect(() => {
    authenticateLogin();
  });

  const authenticateLogin = async () => {
    const fetchAuthResponse = await fetch("http://localhost:8000/auth/google", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.location.state.response.accessToken}`,
      },
    });
    console.log(fetchAuthResponse);
  };

  console.log(props.location.state.response.accessToken);
  console.log(props.location.state);
  return (
    <div className="loading">
      <p>Loading ...</p>
    </div>
  );
}

export default LoginAuth;
