import { Weapons } from '@/config/weapons';
import { usePlayer } from '@/utils/hooks';
import { Button } from '@mui/material';

type Props = {
  onStart: () => void;
};

export default function SplashScreen({ onStart }: Props) {
  const player = usePlayer();
  return (
    <>
      <div>Welcome {player}!</div>
      <Button variant="contained" onClick={onStart}>
        Start game
      </Button>
      <p>Once you start game, you have only 3 seconds to choose your weapon.</p>
      <p>Available weapons: {Weapons.map(w => w.type).join(', ')}</p>
    </>
  );
}
