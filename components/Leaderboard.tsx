import { PlayerScore } from '@/types';
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
import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [topLeaders, setLeaders] = useState<PlayerScore[]>([]);
  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          // setError
          return;
        }
        setLeaders(response);
      });
  }, []);
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
            {topLeaders.map(row => (
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
