import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './styles/global.scss';

export default function App() {
  /* Allows to render dynamic import as a component - aids in code splititng */

  const CatBreedList = lazy(
    () => import(/* webpackChunkName: "CatBreedList" */ './pages/CatBreedList'),
  );
  const CatBreedProfile = lazy(
    () =>
      import(
        /* webpackChunkName: "CatBreedProfile" */ './pages/CatBreedProfile'
      ),
  );
  return (
    <div>
      <div className="bg">
        <div className="container">
          <div className="app-header">
            <span className="app-header-title">
              FIND YOUR <br />
              FELINE FRIENDS
            </span>
          </div>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/breeds/:breedId" component={CatBreedProfile} />
                <Route path="/breeds">
                  <CatBreedList />
                </Route>
                <Redirect to="/breeds" />
              </Switch>
            </Suspense>
          </Router>
        </div>
      </div>
    </div>
  );
}
