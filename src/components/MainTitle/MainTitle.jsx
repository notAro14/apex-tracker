import React from 'react';
import Typography from '@material-ui/core/Typography';

import useStyles from './MainTitle.style';

const MainTitle = ({ children }) => {
  const { title } = useStyles();
  return (
    <Typography variant="h3" color="primary" className={title} align="center">
      {children}
    </Typography>
  );
};

export default MainTitle;
