/* eslint-disable */
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Slide from './Slide';
import Promo from './Promo';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Movies from './Movies';
import Page404 from './Page404';
import ProtectedRoute from './ProtectedRoute';

import * as auth from '../utils/Auth';
import MoviesApi from '../utils/MoviesApi';
import MainApi from '../utils/MainApi';
import { TOKEN_KEY, getToken, updateToken } from '../utils/token';
import { MOMOREPARTIES } from '../utils/constants';
// import MoviesMap from '../utils/MoviesMap';

function App() {
  const history = useHistory();
  const [error, setError] = useState('');
  const [sliderVisible, setSliderVisible] = useState(false);
  // const [moviesTurn, setMoviesTurn] = useState(1);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [submitErrorText, setSubmitErrorText] = useState('');
  const [savedMoviesId, setSavedMoviesId] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [moviesIsShort, setMoviesIsShort] = useState(false);
  const [localMovies, setLocalMovies] = useState([]);
  const [showPreloader, setShowPreloader] = useState(false);

  const clickBurger = () => {
    setSliderVisible(!sliderVisible);
  };

  const handleSliderClick = () => {
    setSliderVisible(!sliderVisible);
  };

  // useEffect(() => {
  //   setSavedMoviesId(savedMovies.map((mv) => Number(mv.movieId)));
  // }, [savedMovies]);

  useEffect(() => {
    if (localMovies.length === 0 && filterText.length > 0) {
      MoviesApi.getMovies()
        .then((moviesData) => {
          setLocalMovies(moviesData);
        })
        .catch((err) => {
          showErrorMessage(err.message);
        })
        .finally(() => {
          setShowPreloader(false);
        });
    } else {
      setShowPreloader(false);
    }
  }, [localMovies, filterText]);

  const handleFilmSubmit = useCallback(
    (filterText, short) => {
      console.log(short);
      console.log(filterText);
      console.log('--------------');
      setShowPreloader(true);
      setFilterText(filterText);
      setMoviesIsShort(short);
    },
    [filterText, moviesIsShort]
  );

  const getUserAndMovies = (token) => {
    Promise.all([MainApi.getUser(token), MainApi.getSavedMovies(token)])
      .then(([userData, savedMoviesData]) => {
        setCurrentUser(userData.data);
        setSavedMovies(savedMoviesData.data);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        showErrorMessage(err.message);
      });
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      history.push('/');
      return;
    }

    auth
      .getContent(token)
      .then((res) => {
        if (res) {
          getUserAndMovies(token);
        }
      })
      .catch(() => {
        //Вставить обработку ошибки!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return;
      });
  }, []);

  function showErrorMessage(message) {
    setError(message);
  }

  const handleRegisterSubmit = (name, email, password) => {
    setLoggedIn(false);
    auth
      .register(name, email, password)
      .then((res) => {
        if (!res.error && res.statusCode !== 400) {
          history.push('/signin');
        } else {
          setLoggedIn(false);
          setError(`Ошибка! ${res.error ? res.error : ''}`);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleLoginSubmit = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (!data.token) {
          setLoggedIn(false);
          setSubmitErrorText(
            `Ошибка аутентификации! ${data.message ? data.message : ''}`
          );
        } else if (data) {
          updateToken(data.token);
          //          Оставлено для варианта с куками
          //          document.cookie = `${TOKEN_KEY}=${data.token}; SameSite=None; Secure`;
          //          Cookies.set(TOKEN_KEY, data.token);
          getUserAndMovies(data.token);
        }
      })
      .catch((err) => {
        setSubmitErrorText(`Ошибка подключения! ${err.message}`);
      });
  };

  const likeMovieClick = (card) => {
    const theCardInArray =
      savedMovies.filter((value) => value.movieId === String(card.id))
        .length !== 0;
    if (theCardInArray) {
      // Удаляем карточку из базы и массива
      console.log(savedMovies);
    } else {
      // Добавляем карточку в базу и в массив
      MainApi.postMovie({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: MOMOREPARTIES + card.image.url,
        trailerLink: MOMOREPARTIES + card.trailerLink,
        movieId: String(card.id),
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        thumbnail: MOMOREPARTIES + card.image.url,
      })
        .then((newMovie) => {
          setSavedMovies([...savedMovies, newMovie.data]);
        })
        .catch((err) => {
          showErrorMessage(err.message);
        })
        .finally(() => {
          // setShowLoadingDesc(false);
        });
    }
  };

  // const setSavedMoviesArr = () => {localMovies={localMovies}
  //   const arr = movies.slice(0, 3);
  //   setSavedMovies(savedMovies.concat(arr));
  // };

  const makeTurnClick = () => {
    // moviesApiConnect();
    // setMoviesTurn(moviesTurn + 1);
  };

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem(TOKEN_KEY);
    history.push('/');
  }

  const WrappedProfile = function (props) {
    return <Profile {...props} click={clickBurger} handleExitClick={signOut} />;
  };

  const WrappedMovies = useCallback(
    (props) => {
      return (
        <Movies
          {...props}
          click={clickBurger}
          // makeTurnClick={makeTurnClick}
          localMovies={localMovies}
          savedMoviesId={savedMoviesId}
          handleFilmSubmit={handleFilmSubmit}
          showPreloader={showPreloader}
          likeMovieClick={likeMovieClick}
        />
      );
    },
    [localMovies, savedMoviesId, showPreloader]
  );

  const WrappedSavedMovies = function (props) {
    return <Movies {...props} movies={savedMovies} click={clickBurger} />;
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser: currentUser }}>
      <div className='App'>
        <div className='page'>
          <Switch>
            <Route exact path='/'>
              <Promo />
            </Route>
            <Route path='/signin'>
              <Login
                onSubmit={handleLoginSubmit}
                setSubmitErrorText={setSubmitErrorText}
                submitErrorText={submitErrorText}
                error={error}
              />
            </Route>
            <Route path='/signup'>
              <Register
                onSubmit={handleRegisterSubmit}
                setSubmitErrorText={setSubmitErrorText}
                submitErrorText={submitErrorText}
                error={error}
              />
            </Route>
            <ProtectedRoute
              loggedIn={loggedIn}
              component={WrappedProfile}
              path='/profile'
            />
            <ProtectedRoute
              loggedIn={loggedIn}
              component={WrappedMovies}
              path='/movies'
            />
            <ProtectedRoute
              loggedIn={loggedIn}
              component={WrappedSavedMovies}
              path='/saved-movies'
            />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
