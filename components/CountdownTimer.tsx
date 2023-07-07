import { PLAY_TIMEOUT } from '@/config';
import { useCountdown } from '@/utils/hooks';
import { Box, LinearProgress, Typography } from '@mui/material';

export default function CountdownTimer({ timeout }: { timeout: number }) {
  const { seconds, milliseconds } = useCountdown(timeout);

  if (seconds < 0) {
    return 'Time out';
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: 300, marginBottom: 4 }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={((seconds * 1000 + milliseconds - 300) / (PLAY_TIMEOUT * 1000)) * 100}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${seconds}:${milliseconds}`}</Typography>
      </Box>
    </Box>
  );
}
