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
        Your Score
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">W</TableCell>
              <TableCell align="center">D</TableCell>
              <TableCell align="center">L</TableCell>
              <TableCell align="center">Pl</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={`leader_${score.player}`}>
              <TableCell align="center">{score.wins}</TableCell>
              <TableCell align="center">{score.draws}</TableCell>
              <TableCell align="center">{score.losses}</TableCell>
              <TableCell align="center">{score.wins + score.draws + score.losses}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
