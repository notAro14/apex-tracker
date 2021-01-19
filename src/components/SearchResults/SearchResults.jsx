import React, { useState, useEffect, lazy } from 'react';

import getPlayerStats from '../../api';
import Loading from '../Loading/Loading';

const Idle = lazy(() => import('../Idle/Idle'));
const Player = lazy(() => import('../Player/Player'));

function SearchResults({ playerInfo }) {
  const PENDING = 'PENDING';
  const IDLE = 'IDLE';
  const RESOLVED = 'RESOLVED';
  const REJECTED = 'REJECTED';

  const [state, setState] = useState({
    status: IDLE,
    player: null,
    error: null,
  });

  const { status, player, error } = state;

  useEffect(() => {
    if (!playerInfo) return;

    const { platform, gamertag } = playerInfo;
    setState({ status: PENDING });
    getPlayerStats({ platform, gamertag }).then(
      data => {
        const {
          data: {
            platformInfo: { avatarUrl, platformUserIdentifier, platformSlug },
            userInfo: { countryCode },
            segments: [overview, ...legends],
          },
        } = data;
        setState({
          status: RESOLVED,
          player: {
            avatarUrl,
            platformUserIdentifier,
            platformSlug,
            countryCode,
            overview: overview.stats,
            legends,
          },
        });
      },
      errorValue => {
        const {
          errors: [{ code, message }],
        } = errorValue;
        setState({ status: REJECTED, error: { code, message } });
      }
    );
  }, [playerInfo]);

  switch (status) {
    case IDLE:
      return <Idle />;
    case PENDING:
      return <Loading />;
    case REJECTED:
      throw error;
    case RESOLVED:
      return <Player player={player} />;
    default:
      throw new Error('UNKNOWN INTERNAL STATE');
  }
}

export default SearchResults;
