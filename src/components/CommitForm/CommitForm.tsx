import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

type Commit = {
  date: Date;
  message: string;
  hours: number;
  minutes: number;
};

type CommitFormProps = {
  onAddCommit: (commit: Commit) => void;
};

const CommitForm: React.FC<CommitFormProps> = ({ onAddCommit }) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [message, setMessage] = useState('');
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      alert('Task name is required!');
      return;
    }

    if (hours < 0 || hours > 24 || minutes < 0 || minutes >= 60) {
      alert('Invalid hours or minutes');
      return;
    }

    onAddCommit({
      date: date!,
      message: message.trim(),
      hours,
      minutes,
    });

    // reset form
    setMessage('');
    setHours(0);
    setMinutes(0);
    setDate(new Date());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          bgcolor: '#f9f9f9', // nền sáng, hợp gu với heatmap
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          maxWidth: 500,
          mx: 'auto',
          mt: 6,
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
            letterSpacing: '0.5px',
            mb: 4,
            color: '#1f2937', // dark gray, hài hòa với heatmap
          }}
        >
          Add Commit
        </Typography>

        <Stack spacing={3}>
          {/* Date */}
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />

          {/* Task name */}
          <TextField
            label="Task Name"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            required
          />

          {/* Hours and minutes */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              inputProps={{ min: 0, max: 24 }}
              fullWidth
            />
            <TextField
              label="Minutes"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              inputProps={{ min: 0, max: 59 }}
              fullWidth
            />
          </Stack>

          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: '#40c463', // màu xanh của heatmap
              '&:hover': { bgcolor: '#30a14e' },
              fontWeight: 600,
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};

export default CommitForm;
