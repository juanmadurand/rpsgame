'use client';

import { Box, Button, Container, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { logout } from '@/utils/cookies';
import Leaderboard from '@/components/Leaderboard';
import { useState } from 'react';
import { MatchResult } from '@/types';
import SplashScreen from '@/components/SplashScreen';
import GameScreen from '@/components/GameScreen';
import PlayerScoreView from '@/components/PlayerScoreView';
import { cyan, deepPurple } from '@mui/material/colors';

const ResultScreen = ({
  result,
  onRetry,
}: {
  result: MatchResult;
  onRetry: (retry: boolean) => void;
}) => {
  return (
    <>
      <div>Result: {result}</div>
      <Box>
        <Button onClick={() => onRetry(true)}>Retry</Button>
        <Button onClick={() => onRetry(false)}>Go back</Button>
      </Box>
    </>
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
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid xs={12} md={8}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: 2,
              backgroundColor: deepPurple['900'],
            }}
          >
            {renderScreen()}
          </Paper>
        </Grid>
        <Grid xs={12} md={4}>
          <Paper sx={{ backgroundColor: cyan['900'] }}>
            <PlayerScoreView />
            <Leaderboard />
            <Stack sx={{ padding: 2 }}>
              <Button variant="outlined" onClick={() => logout()}>
                Logout
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
