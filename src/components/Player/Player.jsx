import React from 'react';
// Material UI
import Typography from '@material-ui/core/Typography';

import PlayerOverview from './PlayerOverview';
import Legends from './Legends';
import useStyles from './Player.style';

const Player = ({ player }) => {
  const { title } = useStyles();
  return (
    <>
      <Typography className={title} variant="h4" color="primary" align="center">
        Joueur
      </Typography>
      <PlayerOverview player={player} />
      <Typography variant="h4" color="primary" className={title} align="center">
        Légendes
      </Typography>
      <Legends legends={player.legends} />
    </>
  );
};

export default Player;
