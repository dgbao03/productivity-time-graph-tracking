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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { commitApi, type CommitResponse } from '../../services/commitService';
import AppSnackbar from '../Common/AppSnackBar';

export type Commit = {
  id?: string;
  date: string;
  message: string;
  hours: number;
  minutes: number;
  time?: string;
};

type DayCommitListModalProps = {
  open: boolean;
  onClose: () => void;
  date: string;
  commits: Commit[];
  onDeleteCommitSuccess?: () => void;
};

const DayCommitListModal: React.FC<DayCommitListModalProps> = ({
  open,
  onClose,
  date,
  onDeleteCommitSuccess,
}) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  
  const [isLoading, setIsLoading] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  useEffect(() => {
    if (!open || !date) return;

    setCommits([]);
    setIsLoading(true);

    const fetchCommits = async () => {
      try {
        const res = await commitApi.getCommitsByDate(date);
        const data: Commit[] = res.data.map((c: CommitResponse) => {
          const commitDate = new Date(c.createdAt);
          const hh = commitDate.getHours().toString().padStart(2, '0');
          const mm = commitDate.getMinutes().toString().padStart(2, '0');

          return {
            id: c.id,
            date: c.date,
            message: c.message,
            hours: c.hours,
            minutes: c.minutes,
            time: `${hh}:${mm}`,
          };
        });
        setCommits(data);
      } catch (err) {
        setCommits([]);
        setSnackbarMessage('Failed to load commits for this day! Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommits();
  }, [open, date]);

  useEffect(() => {
    const total = commits.reduce((sum, c) => sum + c.hours * 60 + c.minutes, 0);
    setTotalMinutes(total);
  }, [commits]);

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const isOver24h = totalMinutes > 24 * 60;

  const handleOpenDeleteDialog = (commit: Commit) => {
    setSelectedCommit(commit);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedCommit(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCommit?.id) return;

    try {
      await commitApi.deleteCommit(selectedCommit.id);

      setSnackbarMessage('Deleted commit successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setCommits(prev => prev.filter(c => c.id !== selectedCommit.id));
      onDeleteCommitSuccess?.();
    } catch (err) {
      setSnackbarMessage('Failed to delete commit! Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress color="primary" />
        </Box>
      );
    }

    if (commits.length === 0) {
      return (
        <Typography
          variant="body1"
          align="center"
          sx={{
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            color: 'text.secondary',
            py: 4, 
          }}
        >
          No commits for this day.
        </Typography>
      );
    }

    return (
      <>
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
              sx={{
                color: 'error.main',
                fontWeight: 600,
                mt: 0.5,
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Oops, looks like we’re over 24 hours for a day. Try adjusting a little.
            </Typography>
          )}
        </Box>

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
                <TableCell sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 600 }}>Duration</TableCell>
                <TableCell sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 600 }}>Task</TableCell>
                <TableCell sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 600 }}>Commit Time</TableCell>
                <TableCell sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 600, width: 50 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {commits.map((commit, idx) => (
                <TableRow key={commit.id || idx} hover>
                  <TableCell sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 500, fontSize: 14, color: '#333' }}>
                    {commit.hours.toString().padStart(2, '0')}:{commit.minutes.toString().padStart(2, '0')}
                  </TableCell>
                  <TableCell sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 500, fontSize: 14, color: '#333' }}>
                    {commit.message}
                  </TableCell>
                  <TableCell sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 500, fontSize: 14, color: '#333' }}>
                    {commit.time || '--:--'}
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="error" onClick={() => handleOpenDeleteDialog(commit)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };


  return (
    <>
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
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              Commits on {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>

          {renderContent()}

        </Box>
      </Modal>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        PaperProps={{ sx: { borderRadius: 3, p: 2, minWidth: 350 } }}
      >
        <DialogTitle sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 600, letterSpacing: '0.5px', fontSize: 18 }}>
          Confirm Delete Commit
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <Typography sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 400, fontSize: 15, color: 'text.primary' }}>
            Are you sure you want to delete commit: 
            <strong> {selectedCommit?.message} </strong>
            ({selectedCommit?.hours}h {selectedCommit?.minutes}m)?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ mt: 1 }}>
          <Button onClick={handleCloseDeleteDialog} sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 500, textTransform: 'none' }}>
            Cancel
          </Button>
          <Button color="error" onClick={handleConfirmDelete} sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 600, textTransform: 'none' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <AppSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
};

export default DayCommitListModal;