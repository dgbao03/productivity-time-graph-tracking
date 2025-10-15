import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface AppSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

const AppSnackbar: React.FC<AppSnackbarProps> = ({
  open,
  onClose,
  message,
  severity = 'info',
  duration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: '100%',
          bgcolor:
            severity === 'success'
              ? '#40c463'
              : severity === 'error'
              ? '#f44336'
              : severity === 'warning'
              ? '#ff9800'
              : '#2196f3',
          color: '#fff',
          fontWeight: 600,
          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
