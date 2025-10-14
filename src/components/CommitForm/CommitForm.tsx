import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { Commit } from '../../types/commit';

type CommitFormProps = {
  onAddCommit: (commit: Commit) => void;
};

const CommitForm: React.FC<CommitFormProps> = ({ onAddCommit }) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [message, setMessage] = useState('');
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorHours, setErrorHours] = useState<string>('');
  const [errorMinutes, setErrorMinutes] = useState<string>('');

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // reset errors
    setErrorMessage('');
    setErrorHours('');
    setErrorMinutes('');
    let hasError = false;

    // validate message
    if (!message.trim()) {
      setErrorMessage('Task name is required!');
      hasError = true;
    }

    if (hours < 0) {
      setErrorHours('Hours cannot be negative');
      hasError = true;
    }

    if (minutes < 0) {
      setErrorMinutes('Minutes cannot be negative');
      hasError = true;
    }

    // chuẩn hóa thời gian
    const totalMinutes = hours * 60 + minutes;
    if (totalMinutes === 0) {
      setErrorHours('Time spent must be greater than 0');
      setErrorMinutes('Time spent must be greater than 0');
      hasError = true;
    }

    const normalizedHours = Math.floor(totalMinutes / 60);
    const normalizedMinutes = totalMinutes % 60;

    if (normalizedHours > 24 || (normalizedHours === 24 && normalizedMinutes > 0)) {
      setErrorHours('Total time cannot exceed 24 hours');
      setErrorMinutes('Total time cannot exceed 24 hours');
      hasError = true;
    }

    if (hasError) return;

    // thời điểm commit thực tế
    const now = new Date();
    const commitTime = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const commit: Commit = {
      date: date!.toISOString().slice(0, 10),
      message: message.trim(),
      hours: normalizedHours,
      minutes: normalizedMinutes,
      time: commitTime,
    };

    onAddCommit(commit);

    // ✅ Chỉ reset message, giữ nguyên date/hours/minutes để thuận tiện nhập nhiều task trong cùng ngày
    setMessage('');

    // hiển thị snackbar
    setOpenSnackbar(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          bgcolor: '#f9f9f9',
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          maxWidth: 500,
          mx: 'auto',
          mt: 6,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
            letterSpacing: '0.5px',
            mb: 4,
          }}
        >
          Add Commit
        </Typography>

        <Stack spacing={3}>
          {/* Date Picker */}
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />

          {/* Commit Message */}
          <TextField
            label="Commit Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            error={!!errorMessage}
            helperText={errorMessage}
          />

          {/* Hours & Minutes (time spent on task) */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              inputProps={{ min: 0, max: 24 }}
              fullWidth
              error={!!errorHours}
              helperText={errorHours}
            />
            <TextField
              label="Minutes"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              inputProps={{ min: 0 }}
              fullWidth
              error={!!errorMinutes}
              helperText={errorMinutes}
            />
          </Stack>

          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#40c463',
              '&:hover': { bgcolor: '#30a14e' },
              fontWeight: 600,
            }}
          >
            Add
          </Button>
        </Stack>

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{
              width: '100%',
              bgcolor: '#40c463',
              color: '#fff',
              fontWeight: 600,
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            }}
          >
            Commit successfully!
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default CommitForm;
