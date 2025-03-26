import React, { useState, useEffect } from 'react';
import './Timer.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Timer({ timezone }) {
  const [time, setTime] = useState(new Date());
  const [city, setCity] = useState();
  const [date, setDate] = useState("****-**-**");
  const [day, setDay] = useState("----");
  const [timeData, setTimeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hours24 = time.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegree = (hours24 + minutes / 60) * 30;
  const minuteDegree = (minutes + seconds / 60) * 6;
  const secondDegree = seconds * 6;

  useEffect(() => {
    const fetchTime = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://api.api-ninjas.com/v1/worldtime?timezone=${timezone}`;
        const response = await fetch(url, {
          headers: {
            'X-Api-Key': 'oBKIWf0uUkRGleUKh/Dl2w==nT732SE1M5MMVTKF'
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API 请求失败: ${response.status} - ${errorText}`);
        }

        const json = await response.json();
        console.log(json)
        setTimeData(json);
        const apiTime = new Date(`${json.date} ${json.hour}:${json.minute}:${json.second}`);
        console.log('API Time:', apiTime);
        setTime(apiTime);
        setCity(json.timezone);
        setDate(json.date);
        setDay(json.day_of_week);
        console.log(json.date)
      } catch (err) {
        console.error('API Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTime();
  }, [timezone]);

  useEffect(() => {
    if (!timeData) return;

    const interval = setInterval(() => {
      setTime(prevTime => {
        const newTime = new Date(prevTime);
        newTime.setSeconds(newTime.getSeconds() + 1);
        return newTime;
      });
      setCity(prevCity => {
        return prevCity
      })
      setDate(prevDate => {
        return prevDate;
      })
      setDay(prevDay => {
        return prevDay;
      })
    }, 1000);

    return () => clearInterval(interval);
  }, [timeData]);

  return (
    <div className="container relative">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <div className="clock-analog">
            <div className="time-marker number-12">12</div>
            <div className="time-marker number-3">3</div>
            <div className="time-marker number-6">6</div>
            <div className="time-marker number-9">9</div>
            <div className="hand hour-hand" style={{ transform: `rotate(${hourDegree}deg)` }}></div>
            <div className="hand minute-hand" style={{ transform: `rotate(${minuteDegree}deg)` }}></div>
            <div className="hand second-hand" style={{ transform: `rotate(${secondDegree}deg)` }}></div>
          </div>
          <div className="clock-digital">
            <div className="city">
              <span>{city}</span>
            </div>
            <div className="number">
              <span className="hour">
                <i>{Math.floor(hours24 / 10)}</i>
                <i>{hours24 % 10}</i>
              </span>
              <span className="colon"></span>
              <span className="min">
                <i>{Math.floor(minutes / 10)}</i>
                <i>{minutes % 10}</i>
              </span>
              <span className="colon"></span>
              <span className="seconds">
                <i>{Math.floor(seconds / 10)}</i>
                <i>{seconds % 10}</i>
              </span>
            </div>
            <div className="date">
              <span>{date}</span>
              <span>{day}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Timer;