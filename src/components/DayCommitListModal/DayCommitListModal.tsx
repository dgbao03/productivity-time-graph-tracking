import React, { useState, useEffect } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';

export type Commit = {
  date: string; // 'YYYY-MM-DD'
  message: string;
  hours: number;
  minutes: number;
  time?: string; // 'HH:MM' - thời điểm commit
};

type DayCommitListModalProps = {
  open: boolean;
  onClose: () => void;
  date: string;
  commits: Commit[];
  onDeleteCommit?: (index: number) => void; // callback xóa commit
};

const DayCommitListModal: React.FC<DayCommitListModalProps> = ({
  open,
  onClose,
  date,
  commits,
  onDeleteCommit,
}) => {
  const [totalMinutes, setTotalMinutes] = useState(0);

  // tính tổng thời gian commit
  useEffect(() => {
    const total = commits.reduce((sum, c) => sum + c.hours * 60 + c.minutes, 0);
    setTotalMinutes(total);
  }, [commits]);

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const isOver24h = totalMinutes > 24 * 60;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="day-commit-list-modal">
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 700,
          bgcolor: '#f9f9f9',
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
          p: 4,
          outline: 'none',
        }}
      >
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            Commits on {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Total time */}
        {commits.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                color: 'text.secondary',
              }}
            >
              Total Time: {totalHours}h {remainingMinutes}m
            </Typography>
            {isOver24h && (
              <Typography
                variant="body2"
                sx={{ color: 'error.main', fontWeight: 600, mt: 0.5, fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', }}
              >
                Oops, looks like we’re over 24 hours for a day. Try adjusting a little.
              </Typography>
            )}
          </Box>
        )}

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
                    Duration
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
                  <TableCell
                    sx={{
                      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                    }}
                  >
                    Commit Time
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      width: 50,
                    }}
                  />
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
                      {commit.time || '--:--'}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDeleteCommit?.(idx)}
                      >
                        <DeleteIcon />
                      </IconButton>
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

export default DayCommitListModal;
