import React, { useEffect, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import timerTidy from "./utils/timerTidy";

// Pass the time and render countdown (zeroPad helper function to pad the units out e.g. 01, 04 etc.)
const renderer = ({ hours, minutes, seconds }) => {
  return (
    <div className="timer">
      <div>
        {zeroPad(hours)}
        <div className="time-label">Hour{hours === 1 ? "" : "s"}</div>
      </div>
      <div className="separator">:</div>
      <div>
        {zeroPad(minutes)}
        <div className="time-label">Minute{minutes === 1 ? "" : "s"}</div>
      </div>
      <div className="separator">:</div>
      <div>
        {zeroPad(seconds)}
        <div className="time-label">Second{seconds === 1 ? "" : "s"}</div>
      </div>
    </div>
  );
};

// Get the local storage item "end date"
const getLocalStorageValue = (s) => localStorage.getItem(s);

const Timer = (props) => {
  // Convert and combine time properties into milliseconds
  const timerAmount =
    3600000 * props.hours + 60000 * props.minutes + 1000 * props.seconds;

  const [data, setData] = useState({ date: Date.now(), delay: timerAmount });

  // useEffect hook to get time from user's local storage and update counter component
  useEffect(() => {
    const savedDate = getLocalStorageValue("end_date");

    // Check for the local storage object
    if (savedDate != null && !isNaN(savedDate)) {
      // Check current time and update time left
      const currentTime = Date.now();
      const timeLeft = parseInt(savedDate, 10) - currentTime;

      // Set the updated data for countdown component
      setData({ date: currentTime, delay: timeLeft });
    }
  }, []);

  return (
    // Count down component using react-countdown package
    <Countdown
      // Set the timer
      date={data.date + data.delay}
      // Call in renderer function to format countdown
      renderer={renderer}
      overtime={false}
      //Save the end date to browser's local storage
      onStart={() => {
        if (localStorage.getItem("end_date") == null)
          localStorage.setItem(
            "end_date",
            JSON.stringify(data.date + data.delay)
          );
      }}
      // Run complete function to remove opt in content, pass through delay value to check if timer already completed or completed in view
      onComplete={() => {
        timerTidy(data.delay);
      }}
    />
  );
};

Timer.defaultProps = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export default Timer;
