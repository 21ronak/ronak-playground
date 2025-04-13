import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  // time is maintained in centiseconds (1 centisecond = 10 ms)
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // useEffect to manage the timer interval
  useEffect(() => {
    // When isRunning is true, set up an interval to update the time every 10ms
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    } else if (!isRunning && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Clean up the interval on unmount
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Start, stop, and reset handlers
  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  // Formatting the time (centiseconds to mm:ss:cs)
  const formatTime = (timeInCs) => {
    // Calculate minutes. One minute equals 6000 centiseconds (60 seconds * 100 centiseconds)
    const minutes = Math.floor(timeInCs / 6000);

    // Calculate seconds. Using the remainder from minutes, one second is 100 centiseconds.
    const seconds = Math.floor((timeInCs % 6000) / 100);

    // Centiseconds remain after accounting for minutes and seconds.
    const centiseconds = timeInCs % 100;

    // pad the numbers with a leading zero if they are less than 10.
    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Stopwatch</h1>
      <div style={{ fontSize: '2rem', margin: '20px' }}>{formatTime(time)}</div>
      <div>
        {!isRunning ? (
          <button onClick={startTimer} style={{ marginRight: '10px' }}>
            Start
          </button>
        ) : (
          <button onClick={stopTimer} style={{ marginRight: '10px' }}>
            Stop
          </button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
