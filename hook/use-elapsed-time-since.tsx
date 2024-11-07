import { useState, useEffect } from 'react';

function useElapsedTimeSince(targetDate: Date): string {
  const [timeElapsed, setTimeElapsed] = useState<string>("");

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = new Date();
      const diff = currentTime.getTime() - targetDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeElapsed(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    // Update timer every second
    const interval = setInterval(updateTimer, 1000);

    // Initial call to set the time immediately
    updateTimer();

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeElapsed;
}

export default useElapsedTimeSince;
