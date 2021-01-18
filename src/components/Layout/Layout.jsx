import React, { useMemo } from 'react';
// Material UI
import { Container, CssBaseline } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { cyan, blueGrey } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const Layout = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: cyan,
          secondary: blueGrey,
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">{children}</Container>
    </ThemeProvider>
  );
};

export default Layout;
