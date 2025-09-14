import React, { useEffect, useRef, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [laps, setLaps] = useState([]);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [centisecond, setCentisecond] = useState(0);

  const intervalId = useRef(null);

  const handleStart = () => {
    if (intervalId.current) return;
    intervalId.current = setInterval(() => {
      setCentisecond((prev) => {
        if (prev === 99) {
          setSecond((sec) => {
            if (sec === 59) {
              setMinute((min) => min + 1);
              return 0;
            }
            return sec + 1;
          });
          return 0;
        }
        return prev + 1;
      });
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  const handleLap = () => {
    setLaps([...laps, { min: minute, sec: second, centisec: centisecond }]);
  };

  const handleReset = () => {
    setMinute(0);
    setSecond(0);
    setCentisecond(0);
    setLaps([]);

  };

  useEffect(() => {
    return () => clearInterval(intervalId.current);
  }, []);

  return (
    <div>
      <p>
        {String(minute).padStart(2, "0")}:{String(second).padStart(2, "0")}:
        {String(centisecond).padStart(2, "0")}
      </p>

      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleLap}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>
            {String(lap.min).padStart(2, "0")}:
            {String(lap.sec).padStart(2, "0")}:
            {String(lap.centisec).padStart(2, "0")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
