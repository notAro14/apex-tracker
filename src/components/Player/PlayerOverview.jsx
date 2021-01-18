import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import useStyles from './Player.style';

const PlayerOverview = ({ player }) => {
  const { card, header, content } = useStyles();
  return (
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
        {Object.values(player.overview).map(({ displayName, displayValue }) => (
          <div key={displayName}>
            <Typography variant="caption" color="textPrimary">
              {displayName}
            </Typography>
            <Typography variant="h5" color="secondary">
              {displayValue}
            </Typography>
            <Divider />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PlayerOverview;
