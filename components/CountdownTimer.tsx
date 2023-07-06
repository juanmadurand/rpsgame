import { useCountdown } from '@/utils/hooks';

export default function CountdownTimer({ timeout }: { timeout: number }) {
  const { seconds, milliseconds } = useCountdown(timeout);

  if (seconds < 0) {
    return 'Time out';
  }

  return `${seconds}:${milliseconds}`;
}
