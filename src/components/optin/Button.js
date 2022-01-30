import React from "react";

// Return Button with relevant URL and Text property
const Button = (props) => {
  if (props.url) {
    return (
      <div className="optin-button">
        <a className="button" href={props.url}>
          {props.text}
        </a>
      </div>
    );
  }
};

export default Button;
