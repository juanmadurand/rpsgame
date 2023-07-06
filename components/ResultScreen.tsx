import { MatchResult } from '@/types';
import { Box, Button } from '@mui/material';

export default function ResultScreen({
  result,
  onRetry,
}: {
  result: MatchResult;
  onRetry: (retry: boolean) => void;
}) {
  return (
    <>
      <div>Result: {result}</div>
      <Box>
        <Button onClick={() => onRetry(true)}>Retry</Button>
        <Button onClick={() => onRetry(false)}>Go back</Button>
      </Box>
    </>
  );
}
