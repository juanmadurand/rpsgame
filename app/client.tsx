'use client';

import { Box, Button, Container, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { logout } from '@/utils/cookies';
import Leaderboard from '@/components/Leaderboard';
import { useState } from 'react';
import { MatchResult } from '@/types';
import SplashScreen from '@/components/SplashScreen';
import GameScreen from '@/components/GameScreen';

const ResultScreen = ({
  result,
  onRetry,
}: {
  result: MatchResult;
  onRetry: (retry: boolean) => void;
}) => {
  return (
    <Box>
      <div>Result: {result}</div>
      <Box>
        <Button onClick={() => onRetry(true)}>Retry</Button>
        <Button onClick={() => onRetry(false)}>Go back</Button>
      </Box>
    </Box>
  );
};

export default function HomeClient({ player }: { player: string }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);

  const renderScreen = () => {
    if (gameStarted) {
      if (result) {
        return (
          <ResultScreen
            onRetry={retry => {
              setResult(null);
              setGameStarted(retry);
            }}
            result={result}
          />
        );
      }
      return <GameScreen onFinish={result => setResult(result)} />;
    }

    return <SplashScreen player={player} onStart={() => setGameStarted(true)} />;
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          {renderScreen()}
        </Grid>
        <Grid xs={12} md={4}>
          <Paper>
            <Leaderboard />
            <Button variant="outlined" onClick={() => logout()}>
              Logout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
