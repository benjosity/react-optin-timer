import React from 'react';

// Define the shape of the Button component props.
interface ButtonProps {
  url?: string; // An optional string representing the URL the button should link to.
  text?: string; // An optional string representing the text displayed on the button.
}

/**
 * Define the Button component as a functional component that accepts the ButtonProps as input.
 * * @param url - The button link.
 * * @param text - The button label.
 */
const Button: React.FC<ButtonProps> = ({ url, text }) => {
  // If the url prop is truthy, i.e. not null, undefined, 0, '', false, or NaN, render the button.
  if (url) {
    return (
      <div className="optin-button">
        <a className="button" href={url}>
          {text}
        </a>
      </div>
    );
  }

  // If the url prop is falsy, i.e. null or undefined, don't render anything.
  return null;
};

// Export the Button component as the default export of this module.
export default Button;
