import React, { useState, Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import SearchResults from './components/SearchResults/SearchResults';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';
import SearchForm from './components/SearchForm/SearchForm';
import Layout from './components/Layout/Layout';
import MainTitle from './components/MainTitle/MainTitle';
import Loading from './components/Loading/Loading';

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
        <Suspense fallback={<Loading />}>
          <SearchResults playerInfo={playerInfo} />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
