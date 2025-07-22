import { useState, useEffect } from 'react';

export default function ClockDisplay() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Tokyo',
        hour12: false 
      };
      
      const timeString = now.toLocaleTimeString('ja-JP', options);
      const dateString = now.toLocaleDateString('ja-JP', { 
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      setTime(timeString);
      setDate(dateString);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 glass rounded-lg p-3 floating">
      <div className="clock-display text-center">
        <div className="text-xl font-mono">{time}</div>
        <div className="text-sm opacity-80">{date}</div>
      </div>
    </div>
  );
}
