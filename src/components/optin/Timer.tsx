import React, { useEffect } from 'react';
import { TimerResult, useTimer } from 'react-timer-hook';
import timerTidy from './utils/timerTidy';

// Interface for the props of the Timer component
interface TimerProps {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

interface TimerResultWithTimestamp extends TimerResult {
  expiryTimestamp: Date;
}

// Function to render the countdown with hours, minutes and seconds
const renderer = ({ hours, minutes, seconds }: any): React.ReactNode => {
  return (
    <div className="timer">
      <div>
        {hours}
        <div className="time-label">Hour{hours === 1 ? '' : 's'}</div>
      </div>
      <div className="separator">:</div>
      <div>
        {minutes}
        <div className="time-label">Minute{minutes === 1 ? '' : 's'}</div>
      </div>
      <div className="separator">:</div>
      <div>
        {seconds}
        <div className="time-label">Second{seconds === 1 ? '' : 's'}</div>
      </div>
    </div>
  );
};

// Function to get the end date from local storage
const getEndDateFromLocalStorage = (): Date => {
  const savedDate = localStorage.getItem('end_date');

  // Check for the local storage object
  if (savedDate != null && !isNaN(Number(savedDate))) {
    // Return updated data for countdown component
    return new Date(parseInt(savedDate, 10));
  }

  return new Date();
};

const Timer: React.FC<TimerProps> = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
}) => {
  // Convert and combine time properties into milliseconds
  const timerAmount = 3600000 * hours + 60000 * minutes + 1000 * seconds;

  // State to store the countdown data
  const expiryTimestamp = (
    useTimer({
      expiryTimestamp: new Date(
        getEndDateFromLocalStorage().getTime() + timerAmount
      ),
      onExpire: () => {
        timerTidy(timerAmount);
      },
    }) as TimerResultWithTimestamp
  ).expiryTimestamp;

  // useEffect hook to update countdown component when the end date is updated
  useEffect(() => {
    localStorage.setItem('end_date', JSON.stringify(expiryTimestamp));
  }, [expiryTimestamp]);

  return (
    // Countdown component using react-timer-hook package
    <div>
      {renderer({
        hours: Math.floor(timerAmount / 3600000),
        minutes: Math.floor(timerAmount / 60000) % 60,
        seconds: Math.floor(timerAmount / 1000) % 60,
      })}
    </div>
  );
};

export default Timer;
