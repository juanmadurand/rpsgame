import { MatchResult, PlayGameResult, WeaponType } from '@/types';
import { Avatar, Box, Button, Fade, Stack, Typography } from '@mui/material';
import { cyan, indigo } from '@mui/material/colors';
import WeaponView from './WeaponView';
import { useContext, useEffect, useState } from 'react';
import { Weapons } from '@/config';
import { GameContext, GameContextType } from '@/utils/context';

type Props = {
  gameResult: PlayGameResult;
  onRetry: (retry: boolean) => void;
};

function FinalResult({ result }: { result: MatchResult }) {
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

function WeaponViewRandom({ onFinish }: { onFinish: () => void }) {
  const [ts, setIncremental] = useState(100);
  const [weaponIndex, setWeaponIndex] = useState(0);

  useEffect(() => {
    if (ts > 1000) {
      onFinish();
      return;
    }
    const timer = setTimeout(() => {
      setIncremental(ts * 1.3);
      setWeaponIndex(index => index + 1);
    }, ts);

    return () => clearTimeout(timer);
  }, [ts, onFinish]);

  return <WeaponView weapon={Weapons[weaponIndex % Weapons.length].type} />;
}

export default function ResultScreen({ gameResult, onRetry }: Props) {
  const [showResult, setShowResult] = useState(false);
  const { updateScore } = useContext(GameContext) as GameContextType;

  const handleFinish = () => {
    setShowResult(true);
    updateScore(gameResult.result);
  };

  return (
    <>
      <Stack direction={'row'} alignItems={'center'} gap={3}>
        <WeaponView weapon={gameResult.userWeaponType} />
        <Avatar sx={{ bgcolor: cyan[900], color: 'white', fontSize: 14 }}>VS</Avatar>
        {showResult ? (
          <WeaponView weapon={gameResult.pcWeaponType} />
        ) : (
          <WeaponViewRandom onFinish={handleFinish} />
        )}
      </Stack>
      <Fade timeout={1000} in={showResult}>
        <Box sx={{ marginTop: 2 }}>
          <FinalResult result={gameResult.result} />
        </Box>
      </Fade>
      <Stack direction="row" gap={2} sx={{ marginTop: 2 }}>
        <Button sx={{ background: indigo[900] }} onClick={() => onRetry(true)}>
          Retry
        </Button>
        <Button onClick={() => onRetry(false)}>Go back</Button>
      </Stack>
    </>
  );
}
