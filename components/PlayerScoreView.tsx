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
import { useContext } from 'react';

export default function PlayerScoreView() {
  const { score } = useContext(GameContext) as GameContextType;
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Score
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">D</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">Pl</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={`leader_${score.player}`}>
              <TableCell align="right">{score.wins}</TableCell>
              <TableCell align="right">{score.draws}</TableCell>
              <TableCell align="right">{score.losses}</TableCell>
              <TableCell align="right">{score.wins + score.draws + score.losses}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
