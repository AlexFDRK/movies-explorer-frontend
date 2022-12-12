///*eslint-disable*/
import '../index.css';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';

import Card from './Card';
import findPic from '../images/find.svg';
import Preloader from './Preloader';
import { updateSearch, getSearch, updateTurn } from '../utils/LastSearch';
import {
  SHORT_FILM_DURSTION,
  TWELVE_FILMS_ON_SCREEN,
  EIGHT_FILMS_ON_SCREEN,
  FIVE_FILMS_ON_SCREEN,
  ADD_FOUR_FILMS,
  ADD_THREE_FILMS,
  ADD_TWO_FILMS,
} from '../utils/constants';

const Body = ({
  itSavedFilms,
  localMovies,
  savedMoviesId,
  filterAppText,
  handleFilmSubmit,
  moviesIsShort,
  showPreloader,
  likeMovieClick,
  connectError,
  clickTurn,
  turn,
  cross,
}) => {
  const [filterText, setFilterText] = useState('');
  const [short, setShort] = useState(false);
  const [size, setSize] = useState(window.innerWidth);
  const [moviesTurn, setMoviesTurn] = useState(0);
  const [searchData, setSearchData] = useState({
    ['filterText']: '',
    ['short']: false,
    ['moviesTurn']: 0,
  });
  var btnVisible = false;

  useEffect(() => {
    if (itSavedFilms && filterAppText !== '') {
      setFilterText('');
      setShort(false);
    }
    if (!itSavedFilms && filterAppText === '') {
      const oldSearch = JSON.parse(getSearch());
      if (oldSearch !== null) {
        const oldFilterTextValue =
          oldSearch.filterText === null ? '' : oldSearch.filterText;
        const oldShortTextValue =
          oldSearch.short === null ? false : oldSearch.short;
        turn.current = 0;
        handleFilmSubmit(oldFilterTextValue, oldShortTextValue);
      }
    }
  }, []);

  const handleResize = useCallback(() => {
    setTimeout(setSize(window.innerWidth), 1000);
  }, [size]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  useEffect(() => {
    if (!itSavedFilms) {
      setFilterText(filterAppText);
    }
  }, [filterAppText]);

  useEffect(() => {
    if (!itSavedFilms) {
      setShort(moviesIsShort);
    }
  }, [moviesIsShort]);

  const clickShort = () => {
    setShort(!short);
  };

  const handleFilmChange = (e) => {
    setFilterText(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!itSavedFilms && !filterText) {
      return;
    }

    if (itSavedFilms) {
      setSearchData({
        ['filterText']: filterText,
        ['short']: short,
        ['moviesTurn']: moviesTurn,
      });
    } else {
      turn.current = 0;
      updateSearch(
        JSON.stringify({
          filterText: filterText,
          short: short,
        })
      );

      handleFilmSubmit(filterText, short);
    }
  }

  const makeTurnClick = useCallback(() => {
    const newTurn = moviesTurn + 1;
    setMoviesTurn(newTurn);
    clickTurn(newTurn);
    updateTurn(newTurn);
  }, [moviesTurn]);

  const filteredArr = () => {
    let seqFilteredArray;

    if (itSavedFilms && searchData['filterText'] === '') {
      seqFilteredArray = searchData['short']
        ? localMovies.filter((value) => value.duration < SHORT_FILM_DURSTION)
        : localMovies;
      return seqFilteredArray;
    }

    const filteredArray = itSavedFilms
      ? localMovies.filter(
          (value) =>
            value.nameRU
              .toLowerCase()
              .includes(searchData['filterText'].toLowerCase()) &&
            (searchData['short'] ? value.duration < SHORT_FILM_DURSTION : true)
        )
      : localMovies.filter(
          (value) =>
            value.nameRU.toLowerCase().includes(filterAppText.toLowerCase()) &&
            (moviesIsShort ? value.duration < SHORT_FILM_DURSTION : true)
        );

    if (size >= 1280) {
      //12карт по 3 ряда по 4 + 4
      seqFilteredArray = filteredArray.slice(
        0,
        TWELVE_FILMS_ON_SCREEN + ADD_FOUR_FILMS * Math.max(turn.current, moviesTurn)
      );
    } else if (size >= 993) {
      //12карт по 4 ряда по 3 в ряд + 3
      seqFilteredArray = filteredArray.slice(
        0,
        TWELVE_FILMS_ON_SCREEN + ADD_THREE_FILMS * Math.max(turn.current, moviesTurn)
      );
    } else if (size >= 757) {
      //8карт 4 ряда по 2 в ряд + 2
      seqFilteredArray = filteredArray.slice(
        0,
        EIGHT_FILMS_ON_SCREEN + ADD_TWO_FILMS * Math.max(turn.current, moviesTurn)
      );
    } else {
      //5 по 1 в ряд + 2
      seqFilteredArray = filteredArray.slice(0, FIVE_FILMS_ON_SCREEN + ADD_TWO_FILMS * turn.current);
    }

    btnVisible = filteredArray.length !== seqFilteredArray.length;

    return seqFilteredArray;
  };

  return (
    <main className='movies__body'>
      <form className='movies__top' onSubmit={handleSubmit}>
        <input
          className='movies__title'
          placeholder='Фильм'
          required={itSavedFilms ? false : true}
          value={filterText || ''}
          type='string'
          onChange={handleFilmChange}
        />
        <button type='submit' className='movies__search link'>
          <img className='movies__find' src={findPic} alt='поиск' />
        </button>
      </form>
      <hr className='line movies__line' />
      <div className='movies__group'>
        <div
          className={`movies__short ${
            short ? 'movies__short_on' : 'movies__short_off'
          }`}
          aria-label='Короткометражки'
          onClick={clickShort}
        >
          <div
            className={`movies__white ${
              short ? 'movies__white_on' : 'movies__white_off'
            }`}
          />
        </div>
        <span>Короткометражки</span>
      </div>
      {showPreloader && localMovies.length === 0 ? (
        <Preloader />
      ) : filteredArr().length === 0 ? (
        <div className='preloader'>
          <p className='promo-footer__description'>
            {connectError
              ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
              : 'Ничего не найдено'}
          </p>
        </div>
      ) : (
        <div>
          <div className='elements'>
            {filteredArr().map((item) => (
              <Card
                card={item}
                cross={cross}
                itSavedFilms={itSavedFilms}
                key={itSavedFilms ? Number(item.movieId) : item.id}
                likeMovieClick={likeMovieClick}
                isLiked={savedMoviesId.includes(
                  itSavedFilms ? Number(item.movieId) : item.id
                )}
              />
            ))}
          </div>
          <button
            type='button'
            className={`movies__button ${
              btnVisible ? '' : 'movies__button_hidden'
            }`}
            onClick={makeTurnClick}
          >
            Ещё
          </button>
        </div>
      )}
    </main>
  );
};

export default React.memo(Body);
