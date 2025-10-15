import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import HeatmapGraph from './components/HeatmapGraph/HeatmapGraph';
import CommitForm from './components/CommitForm/CommitForm';
import DayCommitListModal from './components/DayCommitListModal/DayCommitListModal';
import { commitApi, type CommitSummaryResponse } from './services/commitService';
import AppSnackbar from './components/Common/AppSnackBar';

const App: React.FC = () => {
  const [summary, setSummary] = useState<CommitSummaryResponse[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success'>('success');

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const fetchSummary = async () => {
    try {
      const res = await commitApi.getCommitSummaryByYear(new Date().getFullYear());
      setSummary(res.data);
    } catch (err) {
      console.error('Failed to load commit summary:', err);
      setSnackbarMessage('Failed to load working graph! Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate('');
  };

  const handleAddCommit = async () => {
    await fetchSummary();
  };

  const handleDeleteCommitSuccess = async () => {
    await fetchSummary();
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, mb: 4 }}>
      <Typography
        variant="body1"
        sx={{
          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
          letterSpacing: '0.3px',
          color: 'text.secondary',
          mb: 3,
        }}
      >
        {formattedDate}
      </Typography>

      <HeatmapGraph commits={summary} onDayClick={handleDayClick} />

      <CommitForm onAddCommit={handleAddCommit} />

      <DayCommitListModal
        open={modalOpen}
        onClose={handleCloseModal}
        date={selectedDate}
        commits={[]} 
        onDeleteCommitSuccess={handleDeleteCommitSuccess}
      />

      <AppSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
};

export default App;
