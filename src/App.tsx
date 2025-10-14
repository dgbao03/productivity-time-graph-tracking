import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import HeatmapGraph from './components/HeatmapGraph/HeatmapGraph';
import CommitForm from './components/CommitForm/CommitForm';
import DayCommitListModal, { type Commit as CommitType } from './components/DayCommitListModal/DayCommitListModal';

const LOCAL_STORAGE_KEY = 'commits_data';

const App: React.FC = () => {
  const [commits, setCommits] = useState<CommitType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Load commits từ localStorage khi mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setCommits(JSON.parse(stored));
  }, []);

  // Lưu commits lên localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(commits));
  }, [commits]);

  const handleAddCommit = (commit: CommitType) => {
    setCommits((prev) => [...prev, commit]);
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate('');
  };

  const commitsForSelectedDate = commits.filter((c) => c.date === selectedDate);

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
      
      <HeatmapGraph commits={commits} onDayClick={handleDayClick} />

      <CommitForm onAddCommit={handleAddCommit} />

      <DayCommitListModal
        open={modalOpen}
        onClose={handleCloseModal}
        date={selectedDate}
        commits={commitsForSelectedDate}
      />
    </Box>
  );
};

export default App;
