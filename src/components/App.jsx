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
  const [sliderVisible, setSliderVisible] = useState(false);
  const [moviesTurn, setMoviesTurn] = useState(1);
  const [loadMovies, setLoadMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

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

  const setSavedMoviesArr = () => {
    const arr = movies.slice(0, 3);
    setSavedMovies(savedMovies.concat(arr));
  };

  const makeTurnClick = () => {
    setMoviesArray();
    setMoviesTurn(moviesTurn + 1);
  };

  useEffect(() => {
    setError();
    getUser();
    setMoviesArray();
    setSavedMoviesArr();
    <Promo />;
  }, []);

  const handleRegisterSubmit = () => {
    history.push('/signin');
  };

  const handleLoginSubmit = () => {
    history.push('/movies');
  };

  const validateFunction = (target) => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (target === '' || target === null || target.length === 0) {
      return false;
    }

    if (target.type === 'url') {
      try {
        new URL(target.value);
        return true;
      } catch (_) {
        return false;
      }
    }

    if (target.type === 'email') {
      return EMAIL_REGEXP.test(target.value);
    }

    let minFlag = true,
      maxFlag = true;

    if (target.minLength > 0) {
      minFlag = target.value.length >= Number(target.minLength) ? true : false;
    }

    if (target.maxLength > 0) {
      maxFlag = target.value.length <= Number(target.maxLength) ? true : false;
    }

    return minFlag && maxFlag;
  };

  const findFilmSubmit = (film) => {
    console.log(film);
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
              validateFunction={validateFunction}
              onSubmit={handleLoginSubmit}
              error={error}
            />
          </Route>
          <Route path='/signup'>
            <Register
              validateFunction={validateFunction}
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
              findFilmSubmit={findFilmSubmit}
            />
          </Route>
          <Route path='/saved-movies'>
            <Movies
              movies={savedMovies}
              click={clickBurger}
              findFilmSubmit={findFilmSubmit}
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
