'use client';

import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';
import { PLAY_TIMEOUT, Weapons } from '@/config';
import { PlayGameResult } from '@/types';
import CountdownTimer from '@/components/CountdownTimer';
import { GameContext, GameContextType } from '@/utils/context';
import WeaponView from './WeaponView';

export default function GameScreen({
  onFinish,
}: {
  onFinish: (gameResult: PlayGameResult) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { updateScore } = useContext(GameContext) as GameContextType;

  const handleWeaponSelect = (weaponType: string) => {
    submitGame({ weaponType });
  };

  const submitGame = useCallback(
    (params: Record<string, string>) => {
      if (loading || error) {
        // User already submitted response
        return;
      }
      setLoading(true);
      return fetch(`/api/play?${new URLSearchParams(params).toString()}`)
        .then(res => res.json())
        .then(response => {
          setLoading(false);
          if (response.error) {
            setError(response.error);
            return;
          }
          updateScore(response.result);
          onFinish(response);
        })
        .catch(err => {
          console.log('Error playing game', err);
          setError(err.message || 'Error!');
          setLoading(false);
        });
    },
    [loading, setLoading, onFinish, error, updateScore]
  );

  useEffect(() => {
    const timer = setTimeout(async () => {
      submitGame({ timeout: 'true' });
    }, PLAY_TIMEOUT * 1000);

    return () => clearTimeout(timer);
  }, [submitGame]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <div>
        <h2>Something went wrong!</h2>
      </div>
    );
  }

  return (
    <>
      <Box>
        <CountdownTimer timeout={new Date().getTime() + PLAY_TIMEOUT * 1000} />
      </Box>
      <Stack spacing={2} direction="row">
        {Weapons.map(weapon => (
          <Button key={`weapon_btn_${weapon.type}`} onClick={() => handleWeaponSelect(weapon.type)}>
            <WeaponView weapon={weapon.type} />
          </Button>
        ))}
      </Stack>
    </>
  );
}
