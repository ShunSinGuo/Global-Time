import Timer from './conponents/timer';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState("Asia/Taipei"); // 預設台灣時間
  const [query, setQuery] = useState("Asia/Taipei"); // 預設台灣時間

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setQuery(searchTerm);
    }, 1000);
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  // 定義常用時區選項
  const timezones = [
    { value: "Asia/Taipei", label: "Taiwan (Asia/Taipei)" },
    { value: "Asia/Tokyo", label: "Japan (Asia/Tokyo)" },
    { value: "Europe/London", label: "UK (Europe/London)" },
    { value: "America/New_York", label: "USA - New York (America/New_York)" },
    { value: "America/Los_Angeles", label: "USA - Los Angeles (America/Los_Angeles)" },
    { value: "Australia/Sydney", label: "Australia - Sydney (Australia/Sydney)" },
  ];

  return (
    <div className="text-center">
      <h1 className="mt-5 fw-bold fs-1">Global Time Search</h1>
      <select
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-2 border border-light border-2 rounded-pill"
      >
        <option value="" disabled>Select a timezone</option>
        {timezones.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </select>
      <Timer timezone={query} />
    </div>
  );
}

export default App;