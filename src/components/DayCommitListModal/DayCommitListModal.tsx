import React from 'react';
import {
  Box,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export type Commit = {
  date: string; // 'YYYY-MM-DD'
  message: string;
  hours: number;
  minutes: number;
};

type DayCommitListModalProps = {
  open: boolean;
  onClose: () => void;
  date: string;
  commits: Commit[];
};

const DayCommitListModal: React.FC<DayCommitListModalProps> = ({
  open,
  onClose,
  date,
  commits,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="day-commit-list-modal">
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 600,
          bgcolor: '#f9f9f9',
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
          p: 4,
          outline: 'none',
        }}
      >
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            Commits on {date}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Table */}
        {commits.length === 0 ? (
          <Typography
            variant="body1"
            align="center"
            sx={{
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
              color: 'text.secondary',
            }}
          >
            No commits for this day.
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              maxHeight: 400,
              overflowY: 'auto',
              borderRadius: 2,
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ bgcolor: '#e6f4ea' }}>
                  <TableCell
                    sx={{
                      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                    }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                    }}
                  >
                    Task
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commits.map((commit, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell
                      sx={{
                        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontWeight: 500,
                        letterSpacing: '0.3px',
                        fontSize: 14,
                        color: '#333',
                        minWidth: 60,
                      }}
                    >
                      {commit.hours.toString().padStart(2, '0')}:
                      {commit.minutes.toString().padStart(2, '0')}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontWeight: 500,
                        letterSpacing: '0.3px',
                        fontSize: 14,
                        color: '#333',
                      }}
                    >
                      {commit.message}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Modal>
  );
};

// --- Fake data for testing ---
export const fakeCommits: Commit[] = [
  { date: '2025-10-13', message: 'Fix login bug', hours: 10, minutes: 30 },
  { date: '2025-10-13', message: 'Add new API endpoint', hours: 14, minutes: 15 },
  { date: '2025-10-13', message: 'Refactor user service', hours: 16, minutes: 45 },
  { date: '2025-10-13', message: 'Update README', hours: 9, minutes: 10 },
  { date: '2025-10-13', message: 'Optimize database query', hours: 11, minutes: 20 },
  { date: '2025-10-13', message: 'Fix CSS layout', hours: 13, minutes: 5 },
  { date: '2025-10-13', message: 'Add unit tests', hours: 15, minutes: 50 },
  { date: '2025-10-13', message: 'Update package.json', hours: 17, minutes: 25 },
  { date: '2025-10-13', message: 'Refactor auth module', hours: 18, minutes: 40 },
  { date: '2025-10-13', message: 'Code review fixes', hours: 19, minutes: 0 },
];

export default DayCommitListModal;
