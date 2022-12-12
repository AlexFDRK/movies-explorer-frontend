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
import ProtectedLog from './ProtectedLog';
import ProtectedRoute from './ProtectedRoute';
import PopupWithInfo from './PopupWithInfo';

import * as auth from '../utils/Auth';
import MoviesApi from '../utils/MoviesApi';
import MainApi from '../utils/MainApi';
import { getToken, updateToken } from '../utils/token';
import {
  TOKEN_KEY,
  MOMOREPARTIES,
  WRONG_TOKEN_ERROR,
} from '../utils/constants';
import { removeSearch, removeTurn } from '../utils/LastSearch';

function App() {
  const history = useHistory();
  const [sliderVisible, setSliderVisible] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [submitErrorText, setSubmitErrorText] = useState('');
  const [savedMoviesId, setSavedMoviesId] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [moviesIsShort, setMoviesIsShort] = useState(false);
  const [localMovies, setLocalMovies] = useState([]);
  const [showPreloader, setShowPreloader] = useState(false);
  const [connectError, setConnectError] = useState(false);
  const [misfortuneVisible, setMisfortuneVisible] = useState(false);
  const [itPositive, setItPositive] = useState(false);
  const [errorDescription, setErrorDescription] = useState('');

  const turn = React.useRef(0);

  const clickBurger = () => {
    setSliderVisible(!sliderVisible);
  };

  const handleSliderClick = () => {
    setSliderVisible(!sliderVisible);
  };

  const clickTurn = (value) => {
    turn.current = value;
  };

  useEffect(() => {
    setSavedMoviesId(savedMovies.map((mv) => Number(mv.movieId)));
  }, [savedMovies]);

  const loadMoviesFunction = () => {
    MoviesApi.getMovies()
      .then((moviesData) => {
        setConnectError(false);
        setLocalMovies(moviesData);
      })
      .catch(() => {
        setConnectError(true);
      })
      .finally(() => {
        setShowPreloader(false);
      });
  };

  useEffect(() => {
    setShowPreloader(true);
    if (localMovies.length === 0 && filterText.length > 0) {
      loadMoviesFunction();
    } else {
      setShowPreloader(false);
    }
  }, [localMovies, filterText]);

  const handleFilmSubmit = React.useCallback(
    (film, short) => {
      setFilterText(film);
      setMoviesIsShort(short);
    },
    [filterText, moviesIsShort]
  );

  const getUserAndMovies = (token) => {
    Promise.all([MainApi.getUser(token), MainApi.getSavedMovies(token)])
      .then(([userData, savedMoviesData]) => {
        setCurrentUser(userData.data);
        setSavedMovies(savedMoviesData.data);
      })
      .catch((err) => {
        if (err.status === WRONG_TOKEN_ERROR) {
          signOut();
        }
        showErrorMessage(err.message);
      });
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    auth
      .getContent(token)
      .then((res) => {
        if (res.status === WRONG_TOKEN_ERROR) {
          signOut();
        } else {
          setLoggedIn(true);
          getUserAndMovies(token);
        }
      })
      .catch((err) => {
        showErrorMessage(err);
      });
  }, []);

  const checkToken = (data) => {
    if (!data.token) {
      setLoggedIn(false);
      setSubmitErrorText(
        `Ошибка аутентификации! ${data.message ? data.message : ''}`
      );
    } else if (data) {
      auth
        .getContent(data.token)
        .then((res) => {
          if (res.status === WRONG_TOKEN_ERROR) {
            signOut();
          } else {
            setLoggedIn(true);
            updateToken(data.token);
            getUserAndMovies(data.token);
            history.push('/movies');
          }
        })
        .catch((err) => {
          showErrorMessage(err);
        });
    }
  };

  const handleRegisterSubmit = (name, email, password) => {
    signOut();
    auth
      .register(name, email, password)
      .then((res) => {
        if (!res.error && res.statusCode !== 400) {
          checkToken(res);
        } else {
          setLoggedIn(false);
          setSubmitErrorText(`Ошибка! ${res.error ? res.error : ''}`);
        }
      })
      .catch((err) => {
        setSubmitErrorText(err);
      });
  };

  const handleLoginSubmit = (email, password) => {
    signOut();
    auth
      .authorize(email, password)
      .then((data) => {
        checkToken(data);
      })
      .catch((err) => {
        setSubmitErrorText(`Ошибка подключения!! ${err.message}`);
      });
  };

  const changeProfileClick = (name, email) => {
    MainApi.patchProfile({ email: email, name: name })
      .then((userData) => {
        setCurrentUser(userData.data);
        setSubmitErrorText('Данные изменены!');
      })
      .catch((err) => {
        if (err.status === WRONG_TOKEN_ERROR) {
          signOut();
        }
        setSubmitErrorText(`Ошибка подключения!! ${err.message}`);
      });
  };

  const likeMovieClick = useCallback(
    (card) => {
      const theCardInArray = savedMovies.filter((value) =>
        card.id !== undefined
          ? value.movieId === String(card.id)
          : value.movieId === String(card.movieId)
      );
      if (theCardInArray.length !== 0) {
        // Удаляем карточку из базы и массива
        MainApi.deleteMovie(theCardInArray[0]._id)
          .then(() => {
            setSavedMovies((savedMovies) => {
              return savedMovies.filter((item) => {
                return item.movieId !== theCardInArray[0].movieId;
              });
            });
          })
          .catch((err) => {
            if (err.status === WRONG_TOKEN_ERROR) {
              signOut();
            }
            showErrorMessage(err.message);
          });
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
            if (err.status === WRONG_TOKEN_ERROR) {
              signOut();
            }
            showErrorMessage(err.message);
          });
      }
    },
    [savedMovies]
  );

  function showErrorMessage(message) {
    setMisfortuneVisible(true);
    setItPositive(false);
    setErrorDescription(`Ошибка: ${message}`);
  }

  const closeAllPopups = () => {
    setMisfortuneVisible(false);
    setErrorDescription('');
  };

  const signOut = useCallback(() => {
    setLocalMovies([]);
    setSavedMovies([]);
    setSavedMoviesId([]);
    setFilterText('');
    setMoviesIsShort(false);
    removeSearch();
    removeTurn();
    setLoggedIn(false);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  const WrappedProfile = function (props) {
    return (
      <Profile
        {...props}
        click={clickBurger}
        handleExitClick={signOut}
        handleChangeClick={changeProfileClick}
        setSubmitErrorText={setSubmitErrorText}
        submitErrorText={submitErrorText}
      />
    );
  };

  const WrappedMovies = function (props) {
    return (
      <Movies
        {...props}
        click={clickBurger}
        itSavedFilms={false}
        localMovies={localMovies}
        savedMoviesId={savedMoviesId}
        filterText={filterText}
        setFilterText={setFilterText}
        moviesIsShort={moviesIsShort}
        handleFilmSubmit={handleFilmSubmit}
        showPreloader={showPreloader}
        likeMovieClick={likeMovieClick}
        connectError={connectError}
        clickTurn={clickTurn}
        turn={turn}
        cross={false}
      />
    );
  };

  const WrappedSavedMovies = function (props) {
    return (
      <Movies
        {...props}
        click={clickBurger}
        itSavedFilms={true}
        localMovies={savedMovies}
        savedMoviesId={savedMoviesId}
        filterText={filterText}
        setFilterText={setFilterText}
        moviesIsShort={moviesIsShort}
        handleFilmSubmit={handleFilmSubmit}
        showPreloader={showPreloader}
        likeMovieClick={likeMovieClick}
        connectError={connectError}
        clickTurn={clickTurn}
        turn={turn}
        cross={true}
      />
    );
  };

  const WrappedLogin = function (props) {
    return (
      <Login
        {...props}
        setSubmitErrorText={setSubmitErrorText}
        submitErrorText={submitErrorText}
        onSubmit={handleLoginSubmit}
      />
    );
  };

  const WrappedLogup = function (props) {
    return (
      <Register
        {...props}
        setSubmitErrorText={setSubmitErrorText}
        submitErrorText={submitErrorText}
        onSubmit={handleRegisterSubmit}
      />
    );
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser: currentUser }}>
      <div className='App'>
        <div className='page'>
          <Switch>
            <Route exact path='/'>
              <Promo loggedIn={loggedIn} click={clickBurger} />
            </Route>
            <ProtectedLog component={WrappedLogin} path='/signin' />
            <ProtectedLog component={WrappedLogup} path='/signup' />
            <ProtectedRoute
              loggedIn={loggedIn}
              component={WrappedProfile}
              path='/profile'
            />
            <ProtectedRoute
              loggedIn={loggedIn}
              component={WrappedSavedMovies}
              path='/saved-movies'
            />
            <ProtectedRoute
              loggedIn={loggedIn}
              component={WrappedMovies}
              path='/movies'
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
          <PopupWithInfo
            name='info'
            isOpen={misfortuneVisible}
            onClose={closeAllPopups}
            isItPositive={itPositive}
            errorDescription={errorDescription}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
