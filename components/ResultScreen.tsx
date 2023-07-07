import { MatchResult } from '@/types';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';

type Props = {
  result: MatchResult;
  onRetry: (retry: boolean) => void;
};

function ResultSign({ result }: Pick<Props, 'result'>) {
  switch (result) {
    case MatchResult.WIN:
      return (
        <Typography variant="h3" color="success.main">
          You won!
        </Typography>
      );
    case MatchResult.LOSE:
      return (
        <Typography variant="h3" color="error.main">
          You lost :(
        </Typography>
      );
    case MatchResult.DRAW:
      return (
        <Typography variant="h3" color="info.main">
          It&apos;s a draw!
        </Typography>
      );

    default:
      return null;
  }
}

export default function ResultScreen({ result, onRetry }: Props) {
  return (
    <>
      <ResultSign result={result} />
      <Stack direction="row" gap={2} sx={{ marginTop: 2 }}>
        <Button sx={{ background: indigo[900] }} onClick={() => onRetry(true)}>
          Retry
        </Button>
        <Button onClick={() => onRetry(false)}>Go back</Button>
      </Stack>
    </>
  );
}
