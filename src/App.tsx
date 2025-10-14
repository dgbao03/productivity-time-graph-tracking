import React, { useState } from 'react';
import { Box } from '@mui/material';
import HeatmapGraph from './components/HeatmapGraph/HeatmapGraph';
import CommitForm from './components/CommitForm/CommitForm';
import DayCommitListModal, { fakeCommits } from './components/DayCommitListModal/DayCommitListModal';

const App: React.FC = () => {
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate('');
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, mb: 4 }}>
      {/* Heatmap */}
      <HeatmapGraph onDayClick={handleDayClick} />

      {/* Commit form */}
      <Box sx={{ mt: 6 }}>
        <CommitForm onAddCommit={() => {}} /> {/* Callback tạm thời */}
      </Box>

      {/* Modal */}
      <DayCommitListModal
        open={modalOpen}
        onClose={handleCloseModal}
        date={selectedDate}
        commits={fakeCommits} // Hiển thị fake data
      />
    </Box>
  );
};

export default App;
