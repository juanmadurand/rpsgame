import { useEffect, useState } from 'react';

const COUNTDOWN_REFRESH_INTERVAL = 50; // millis

export const useCountdown = (targetDate: number) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, COUNTDOWN_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return {
    seconds: Math.floor((countDown % (1000 * 60)) / 1000),
    milliseconds: countDown % 1000,
  };
};
