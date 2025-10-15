import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { commitApi } from '../../services/commitService';
import AppSnackbar from '../Common/AppSnackBar'

type CommitFormProps = {
  onAddCommit: () => void;
};

const CommitForm: React.FC<CommitFormProps> = ({ onAddCommit }) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [message, setMessage] = useState('');
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorHours, setErrorHours] = useState<string>('');
  const [errorMinutes, setErrorMinutes] = useState<string>('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage('');
    setErrorHours('');
    setErrorMinutes('');
    let hasError = false;

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

    try {
      await commitApi.addCommit({
        date: date!.toISOString().slice(0, 10),
        message: message.trim(),
        hours: normalizedHours,
        minutes: normalizedMinutes,
      });

      onAddCommit();

      setMessage('');

      setSnackbarMessage('Commit successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (err) {
      setSnackbarMessage('Failed to add commit! Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
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
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />

          <TextField
            label="Commit Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            error={!!errorMessage}
            helperText={errorMessage}
          />

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

        <AppSnackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CommitForm;
