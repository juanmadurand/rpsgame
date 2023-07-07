import { PLAY_TIMEOUT, Weapons } from '@/config';
import { usePlayer } from '@/utils/hooks';
import { Box, Button } from '@mui/material';

type Props = {
  onStart: () => void;
};

export default function SplashScreen({ onStart }: Props) {
  const player = usePlayer();
  return (
    <>
      <Box sx={{ marginBottom: 2 }}>Welcome {player}!</Box>
      <Button variant="contained" onClick={onStart}>
        Start game
      </Button>
      <p>Once you start game, you have only {PLAY_TIMEOUT} seconds to choose your weapon.</p>
      <p>Available weapons: {Weapons.map(w => w.type).join(', ')}</p>
    </>
  );
}
