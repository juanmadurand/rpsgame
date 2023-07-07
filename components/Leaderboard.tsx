import { GameContext, GameContextType } from '@/utils/context';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useContext, useMemo } from 'react';

export default function Leaderboard() {
  const { leaderBoard, score } = useContext(GameContext) as GameContextType;

  const mergedScore = useMemo(() => {
    const lBoard = leaderBoard.filter(s => s.player !== score.player);

    return lBoard.concat(score).sort((a, b) => b.wins - a.wins);
  }, [leaderBoard, score]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Leader Board
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">D</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">Pl</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mergedScore.map(row => (
              <TableRow key={`leader_${row.player}`}>
                <TableCell component="th" scope="row">
                  {row.player}
                </TableCell>
                <TableCell align="right">{row.wins}</TableCell>
                <TableCell align="right">{row.draws}</TableCell>
                <TableCell align="right">{row.losses}</TableCell>
                <TableCell align="right">{row.wins + row.draws + row.losses}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
