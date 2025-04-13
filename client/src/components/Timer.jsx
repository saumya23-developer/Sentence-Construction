import React, { useState, useEffect } from 'react';

/**
 * Timer Component
 * 
 * Displays a countdown timer starting from the specified initial time (in seconds).
 * Calls the `onTimeEnd` callback when the timer reaches 0.
 *
 * Props:
 * - initialTime (number): Time in seconds from which the countdown starts.
 * - onTimeEnd (function): Callback function invoked when the countdown ends.
 */
const Timer = ({ initialTime, onTimeEnd }) => {
  // State to store the current countdown time
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    // Reset the timer to the initial time when component mounts or props change
    setTime(initialTime);

    // Set up the countdown interval (1 second interval)
    const timer = setInterval(() => {
      setTime((prevTime) => {
        // If time reaches 0 or below, clear interval and trigger onTimeEnd callback
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeEnd(); // Notify parent that timer has ended
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clear the interval on unmount or when dependencies change
    return () => clearInterval(timer);
  }, [initialTime, onTimeEnd]);

  /**
   * Formats time in MM:SS format
   * @param {number} time - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-2xl font-mono">
      {formatTime(time)}
    </div>
  );
};

export default Timer;
