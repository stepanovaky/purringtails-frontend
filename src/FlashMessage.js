import React from "react";
import FlashMessage from "react-flash-message";

function Flash(props) {
  return (
    <FlashMessage duration={5000}>
      <p>{props.message}</p>
    </FlashMessage>
  );
}

export default Flash;
