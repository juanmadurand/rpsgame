'use client';

import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Weapons } from '@/config/weapons';
import { MatchResult } from '@/types';
import CountdownTimer from '@/components/CountdownTimer';

export default function GameScreen({ onFinish }: { onFinish: (result: MatchResult) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleWeaponSelect = (weaponType: string) => {
    submitGame({ weaponType });
  };

  const submitGame = useCallback(
    (params: Record<string, string>) => {
      if (loading) {
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
          onFinish(response.result);
        })
        .catch(err => {
          console.log('Error playing game', err);
          setError(err.message || 'Error!');
          setLoading(false);
        });
    },
    [loading, setLoading, onFinish]
  );

  useEffect(() => {
    const timer = setTimeout(async () => {
      submitGame({ timeout: 'true' });
    }, 3000);

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
        <CountdownTimer timeout={new Date().getTime() + 3000} />
      </Box>
      <Stack spacing={2} direction="row">
        {Weapons.map(weapon => (
          <Button key={`weapon_btn_${weapon.type}`} onClick={() => handleWeaponSelect(weapon.type)}>
            {weapon.type}
          </Button>
        ))}
      </Stack>
    </>
  );
}
