import { Button } from '@mui/material';

type Props = {
  player: string;
  onStart: () => void;
};

export default function SplashScreen({ player, onStart }: Props) {
  return (
    <>
      <div>Welcome {player}!</div>
      <Button variant="contained" onClick={onStart}>
        Start game
      </Button>
      <p>Once you start game, you have only 3 seconds to choose your weapon.</p>
      <p>Available weapons: rock, paper, scissors</p>
    </>
  );
}
