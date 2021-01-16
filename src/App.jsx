import React, { Suspense, lazy } from 'react';
// router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// components
import { Loading, Navbar, NotFound } from './components';

const HomePage = lazy(() => import('./views/HomePage'));
const InstallationPage = lazy(() => import('./views/InstallationPage'));

export default () => {
  return (
    <div id="app">
      <Router>
        <Navbar />
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/installation">
              <InstallationPage />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
};
