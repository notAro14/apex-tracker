import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './Loading.style';

const Loading = () => {
  const { loadingContainer } = useStyles();
  return (
    <Box className={loadingContainer}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
