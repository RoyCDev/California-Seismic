import React, { useEffect, useState, useRef } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/24/solid";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const colorRef = useRef();
  const startTimer = () => {
    setTimerStarted(true);
    setTimerId(
      setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timerId);
    colorRef.current.classList.remove("text-red-700");
    setTimerStarted(false);
    setSeconds(0);
    setMinutes(0);
  };
  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
    }
    if (minutes === 2 && seconds === 45) {
      colorRef.current.classList.add("text-red-700");
    }
  }, [seconds]);

  return (
    <div
      ref={colorRef}
      className="flex gap-2"
    >
      {timerStarted ? (
        <button onClick={stopTimer}>
          <StopIcon className="h-4 w-4" />
        </button>
      ) : (
        <button onClick={startTimer}>
          <PlayIcon className="h-4 w-4" />
        </button>
      )}
      <p className="font-bold text-base tracking-wider">
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </p>
    </div>
  );
};

export default Timer;