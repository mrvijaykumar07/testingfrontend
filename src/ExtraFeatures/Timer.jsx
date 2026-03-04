import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Timer, History, Clock } from "lucide-react";
import Navbar from "../Pages/LandingPage/Navbar";
import BottomNavbar from "../Pages/LandingPage/BottomNavbar";

const formatDisplayTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");
  return hours > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
};

function TimerApp() {
  const [mode, setMode] = useState("timer");
  const [time, setTime] = useState(300);
  const [initialTime, setInitialTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [customHours, setCustomHours] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(0);
  const [customSeconds, setCustomSeconds] = useState(0);
  const [showCustom, setShowCustom] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (mode === "timer") {
            if (prev <= 0) {
              clearInterval(interval);
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTime(newMode === "timer" ? initialTime : 0);
  };

  const handleStartPause = () => {
    if (mode === "timer" && time === 0) setTime(initialTime);
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(mode === "timer" ? initialTime : 0);
  };

  const handleSetTime = (seconds) => {
    setMode("timer");
    setIsRunning(false);
    setInitialTime(seconds);
    setTime(seconds);
  };

  const handleCustomSubmit = () => {
    const totalSeconds = customHours * 3600 + customMinutes * 60 + customSeconds;
    if (totalSeconds > 0 && totalSeconds <= 3600 * 5) {
      handleSetTime(totalSeconds);
      setShowCustom(false);
      setCustomHours(0);
      setCustomMinutes(0);
      setCustomSeconds(0);
    } else {
      alert("Please enter a valid time (up to 5 hours)");
    }
  };

  const presets = [
    { label: "5 min", sec: 300 },
    { label: "10 min", sec: 600 },
    { label: "30 min", sec: 1800 },
    { label: "1 hour", sec: 3600 },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
        <div className="bg-white rounded-3xl shadow-2xl  h-[30rem] w-full max-w-md p-8 border border-gray-200">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => handleModeChange("timer")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition font-semibold border ${
                mode === "timer"
                  ? "bg-indigo-900 text-white shadow-md border-indigo-900"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
              }`}
            >
              <Timer size={18} /> Timer
            </button>
            <button
              onClick={() => handleModeChange("stopwatch")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition font-semibold border ${
                mode === "stopwatch"
                  ? "bg-indigo-900 text-white shadow-md border-indigo-900"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
              }`}
            >
              <History size={18} /> Stopwatch
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-5xl font-mono font-bold tracking-wide text-gray-800">
              {formatDisplayTime(time)}
            </h1>
          </div>

          <div className="flex justify-center gap-8 mb-6">
            <button
              onClick={handleReset}
              className="p-4 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 shadow transition"
            >
              <RotateCcw size={28} />
            </button>
            <button
              onClick={handleStartPause}
              className={`p-4 w-18 h-18 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg transition ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isRunning ? <Pause size={32} /> : <Play size={32} />}
            </button>
          </div>

          {mode === "timer" && (
            <div>
              <p className="text-center text-sm text-gray-600 mb-3 font-medium">
                Set Timer
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {presets.map((p) => (
                  <button
                    key={p.sec}
                    onClick={() => handleSetTime(p.sec)}
                    className={`px-4 py-2 rounded-xl font-medium border shadow-sm transition ${
                      initialTime === p.sec
                        ? "bg-indigo-900 text-white border-indigo-900"
                        : "bg-white text-indigo-900 text-xs border-gray-300 hover:bg-indigo-50"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}

                <button
                  onClick={() => setShowCustom(!showCustom)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium border bg-white text-indigo-900 border-gray-300 hover:bg-indigo-50 transition"
                >
                  <Clock size={18} /> Custom
                </button>
              </div>

              {showCustom && (
                <div className="mt-4 flex flex-col items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-inner">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      max="5"
                      placeholder="H"
                      value={customHours}
                      onChange={(e) => setCustomHours(Number(e.target.value))}
                      className="w-16 p-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                    <input
                      type="number"
                      min="0"
                      max="59"
                      placeholder="M"
                      value={customMinutes}
                      onChange={(e) => setCustomMinutes(Number(e.target.value))}
                      className="w-16 p-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                    <input
                      type="number"
                      min="0"
                      max="59"
                      placeholder="S"
                      value={customSeconds}
                      onChange={(e) => setCustomSeconds(Number(e.target.value))}
                      className="w-16 p-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                  </div>
                  <button
                    onClick={handleCustomSubmit}
                    className="px-4 py-2 rounded-lg bg-indigo-900 text-white font-semibold hover:bg-indigo-700 transition"
                  >
                    Set Time
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <BottomNavbar />
    </>
  );
}

export default TimerApp;