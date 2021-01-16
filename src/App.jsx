import React, { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CircularProgress,
  Box,
  Chip,
  Divider,
  Grid,
  CssBaseline,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { cyan, blueGrey } from '@material-ui/core/colors';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import getPlayerStats from './api';

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: theme.spacing(4),
    maxWidth: 350,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 300,
    [theme.breakpoints.down('xs')]: {
      height: 200,
    },
  },
}));

const getPlayerStatsStyles = makeStyles(theme => ({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  header: {
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    '& .MuiCardHeader-action': {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  card: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 350,
    marginBottom: theme.spacing(4),
  },
  content: {
    height: 200,
    overflow: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  grid: {
    flexGrow: 1,
  },
}));

function PlayerStats({ playerInfo, onError }) {
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const {
    loadingContainer,
    header,
    content,
    media,
    card,
    grid,
    title,
  } = getPlayerStatsStyles();

  const platform = playerInfo?.platform;
  const gamertag = playerInfo?.gamertag;

  useEffect(() => {
    if (!platform || !gamertag) return;
    setPlayer(null);
    getPlayerStats({ platform, gamertag })
      .then(
        ({
          data: {
            platformInfo: { avatarUrl, platformUserIdentifier, platformSlug },
            userInfo: { countryCode },
            segments,
          },
        }) => {
          const [overview, ...legends] = segments;
          setPlayer({
            avatarUrl,
            platformUserIdentifier,
            platformSlug,
            countryCode,
            overview: overview.stats,
            legends,
          });
        }
      )
      .catch(errorValue => {
        const {
          errors: [{ code, message }],
        } = errorValue;
        setError({ code, message });
      });
  }, [platform, gamertag]);

  if (error) {
    const handleClose = (evt, reason) => {
      if (reason === 'clickaway') return;
      setError(null);
      onError();
    };
    return (
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          elevation={6}
        >
          {error.message}
        </Alert>
      </Snackbar>
    );
  }

  if (!platform || !gamertag) {
    return (
      <Typography variant="body1" color="textSecondary" align="center">
        Entre le nom d&apos;un joueur pour voir ses stats
      </Typography>
    );
  }
  if (!player) {
    return (
      <Box className={loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Typography className={title} variant="h4" color="primary" align="center">
        Joueur
      </Typography>
      <Card raised className={card}>
        <CardHeader
          className={header}
          avatar={<Avatar alt="Player's avatar" src={player.avatarUrl} />}
          title={
            <Typography variant="h6" color="primary">
              {player.platformUserIdentifier}
            </Typography>
          }
          subheader={player.platformSlug}
          action={
            player.countryCode && (
              <Chip label={player.countryCode} color="secondary" />
            )
          }
        />
        <Divider />
        <CardContent className={content}>
          {Object.values(player.overview).map(
            ({ displayName, displayValue }) => (
              <div key={displayName}>
                <Typography variant="caption" color="textPrimary">
                  {displayName}
                </Typography>
                <Typography variant="h5" color="secondary">
                  {displayValue}
                </Typography>
                <Divider />
              </div>
            )
          )}
        </CardContent>
      </Card>
      <Typography variant="h4" color="primary" className={title} align="center">
        Légendes
      </Typography>
      <Grid className={grid} container spacing={4}>
        {player.legends.map(legend => {
          const {
            metadata: { name, bgImageUrl },
            stats,
          } = legend;
          return (
            <Grid key={name} item lg={4} sm={6} xs={12}>
              <Card>
                <CardHeader
                  title={
                    <Typography variant="h6" color="primary">
                      {name}
                    </Typography>
                  }
                />
                <CardMedia className={media} title={name} image={bgImageUrl} />
                <CardContent className={content}>
                  {Object.values(stats).map(({ displayName, displayValue }) => (
                    <div key={displayName}>
                      <Typography variant="caption" color="textPrimary">
                        {displayName}
                      </Typography>
                      <Typography variant="h6" color="secondary">
                        {displayValue}
                      </Typography>
                      <Divider />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

function App() {
  const [platform, setPlatform] = useState('psn');
  const [gamertag, setGamertag] = useState('');
  const [playerInfo, setPlayerInfo] = useState(null);
  const { form, paper, title } = useStyles();

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
      <Container maxWidth="md">
        <Typography
          variant="h4"
          color="primary"
          className={title}
          align="center"
        >
          Apex Legends Tracker
        </Typography>
        <Paper className={paper} elevation={3}>
          <form
            className={form}
            onSubmit={evt => {
              evt.preventDefault();
              setPlayerInfo({ platform, gamertag });
            }}
          >
            <FormControl>
              <InputLabel id="platform-label">Plateforme de jeu</InputLabel>
              <Select
                labelId="platform-label"
                id="platform"
                value={platform}
                onChange={evt => setPlatform(evt.target.value)}
              >
                <MenuItem value="psn">Playstation</MenuItem>
                <MenuItem value="xbl">Xbox</MenuItem>
                <MenuItem value="origin">PC</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              id="gamertag"
              label="Gamertag ou Id"
              value={gamertag}
              onChange={evt => setGamertag(evt.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={!platform || !gamertag}
            >
              Chercher
            </Button>
          </form>
        </Paper>
        <PlayerStats
          playerInfo={playerInfo}
          onError={() => setPlayerInfo(null)}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
