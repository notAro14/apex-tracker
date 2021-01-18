import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Snackbar
      open={!!error}
      autoHideDuration={3000}
      onClose={resetErrorBoundary}
    >
      <Alert
        onClose={resetErrorBoundary}
        severity="error"
        variant="filled"
        elevation={6}
      >
        {error.message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorFallback;
