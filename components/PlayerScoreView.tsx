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

export default function PlayerScoreView() {
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
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
