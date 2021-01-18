import React, { useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './components/ErrorFallback/ErrorFallback';
import SearchResults from './components/SearchResults/SearchResults';
import SearchForm from './components/SearchForm/SearchForm';
import Layout from './components/Layout/Layout';
import MainTitle from './components/MainTitle/MainTitle';

function App() {
  const [playerInfo, setPlayerInfo] = useState(null);

  const onSubmit = evt => {
    evt.preventDefault();
    const { gamertag, platform } = evt.target.elements;
    setPlayerInfo({ platform: platform.value, gamertag: gamertag.value });
  };

  return (
    <Layout>
      <MainTitle>Apex Legends Tracker</MainTitle>
      <SearchForm onSubmit={onSubmit} />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setPlayerInfo(null)}
      >
        <SearchResults playerInfo={playerInfo} />
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
