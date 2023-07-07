'use client';

import { Button, Container, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { logout } from '@/utils/cookies';
import Leaderboard from '@/components/Leaderboard';
import { useState } from 'react';
import { PlayGameResult } from '@/types';
import SplashScreen from '@/components/SplashScreen';
import GameScreen from '@/components/GameScreen';
import PlayerScoreView from '@/components/PlayerScoreView';
import { cyan, deepPurple } from '@mui/material/colors';
import ResultScreen from '@/components/ResultScreen';

const MainScreen = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameResult, setResult] = useState<PlayGameResult | null>(null);

  if (gameStarted) {
    if (gameResult) {
      return (
        <ResultScreen
          onRetry={retry => {
            setResult(null);
            setGameStarted(retry);
          }}
          gameResult={gameResult}
        />
      );
    }
    return <GameScreen onFinish={result => setResult(result)} />;
  }

  return <SplashScreen onStart={() => setGameStarted(true)} />;
};

export default function HomeClient() {
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
            <MainScreen />
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
