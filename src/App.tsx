import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import HeatmapGraph from './components/HeatmapGraph/HeatmapGraph';
import CommitForm from './components/CommitForm/CommitForm';
import DayCommitListModal, {
  type Commit as CommitType,
} from './components/DayCommitListModal/DayCommitListModal';

const App: React.FC = () => {
  const [commits, setCommits] = useState<CommitType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Ngày hiện tại hiển thị góc trái
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Thêm commit mới
  const handleAddCommit = (commit: CommitType) => {
    setCommits((prev) => [...prev, commit]);
  };

  // Khi click vào 1 ngày trên heatmap
  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate('');
  };

  // Lọc commit theo ngày
  const commitsForSelectedDate = commits.filter((c) => c.date === selectedDate);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, mb: 4 }}>
      {/* Ngày hiện tại (hiển thị góc trái) */}
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

      {/* Heatmap hiển thị các ngày có commit */}
      <HeatmapGraph commits={commits} onDayClick={handleDayClick} />

      {/* Form thêm commit mới */}
      <CommitForm onAddCommit={handleAddCommit} />

      {/* Modal chi tiết commit theo ngày */}
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
