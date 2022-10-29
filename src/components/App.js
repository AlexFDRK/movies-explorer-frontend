import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Slide from './Slide';
import Promo from './Promo';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Movies from './Movies';
import Page404 from './Page404';

import { movies } from '../utils/constants';

function App() {
  const history = useHistory();
  const [error, setError] = useState('');
  const [sliderVisible, setSliderVisible] = useState(true);
  const [moviesTurn, setMoviesTurn] = useState(1);
  const [loadMovies, setLoadMovies] = useState([]);

  const clickBurger = () => {
    setSliderVisible(!sliderVisible);
  };

  const handleSliderClick = () => {
    setSliderVisible(!sliderVisible);
  };

  const getUser = () => {};

  const setMoviesArray = () => {
    const arr = movies.slice((moviesTurn - 1) * 16, moviesTurn * 16);
    setLoadMovies(loadMovies.concat(arr));
  };

  const makeTurnClick = () => {
    setMoviesArray();
    setMoviesTurn(moviesTurn + 1);
  };

  useEffect(() => {
    setError();
    getUser();
    setMoviesArray();
    <Promo />
  }, []);

  const handleRegisterSubmit = () => {
    history.push('/signin');
  };

  const handleLoginSubmit = () => {
    history.push('/movies');
  };

  return (
    <div className='App'>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Promo />
          </Route>
          <Route path='/signin'>
            <Login
              onSubmit={handleLoginSubmit}
              error={error}
            />
          </Route>
          <Route path='/signup'>
            <Register
              onSubmit={handleRegisterSubmit}
              error={error}
            />
          </Route>
          <Route path='/profile'>
            <Profile click={clickBurger} />
          </Route>
          <Route path='/movies'>
            <Movies
              movies={loadMovies}
              click={clickBurger}
              makeTurnClick={makeTurnClick}
            />
          </Route>
          <Route path='/404'>
            <Page404 />
          </Route>
          <Route path='*'>
            <Redirect to='/404' />
          </Route>
        </Switch>
        <Slide
          isSliderVisible={sliderVisible}
          clickSlider={handleSliderClick}
        />
      </div>
    </div>
  );
}

export default App;
