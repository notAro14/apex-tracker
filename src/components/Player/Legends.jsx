import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './Player.style';

const Legends = ({ legends }) => {
  const { content, media, grid } = useStyles();
  return (
    <Grid className={grid} container spacing={4}>
      {legends.map(legend => {
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
  );
};

export default Legends;
