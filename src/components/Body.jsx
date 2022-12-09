/*eslint-disable*/
import '../index.css';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';

import Card from './Card';
import findPic from '../images/find.svg';
import Preloader from './Preloader';
import {
  updateSearch,
  getSearch,
  updateTurn,
  getTurn,
} from '../utils/LastSearch';

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
  var btnVisible = false;

  useEffect(() => {
    if (itSavedFilms && filterAppText !== '') {
      setFilterText('');
      setShort(false);
    }
    if (!itSavedFilms && filterAppText === '') {
      const oldSearch = JSON.parse(getSearch());
      const oldTurn = getTurn();
      if (oldSearch !== null) {
        const oldFilterTextValue =
          oldSearch.filterText === null ? '' : oldSearch.filterText;
        const oldShortTextValue =
          oldSearch.short === null ? false : oldSearch.short;
        const oldMoviesTurn = oldTurn === null ? 0 : Number(oldTurn);
        turn.current = oldMoviesTurn;
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
    if (!itSavedFilms){
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

    if (!filterText) {
      return;
    }

    turn.current = 0;
    updateSearch(
      JSON.stringify({
        filterText: filterText,
        short: short,
      })
    );

    handleFilmSubmit(filterText, short);
  }

  const makeTurnClick = useCallback(() => {
    const newTurn = moviesTurn + 1;
    setMoviesTurn(newTurn);
    clickTurn(newTurn);
    updateTurn(newTurn);
  }, [moviesTurn]);

  const filteredArr = () => {
    let seqFilteredArray;

    const filteredArray = itSavedFilms
      ? localMovies.filter(
          (value) =>
            value.nameRU.toLowerCase().includes(filterText.toLowerCase()) &&
            (short ? value.duration < 40 : true)
        )
      : localMovies.filter(
          (value) =>
            value.nameRU.toLowerCase().includes(filterAppText.toLowerCase()) &&
            (moviesIsShort ? value.duration < 40 : true)
        );

    if (size >= 1280) {
      //12карт по 3 ряда по 4 + 4
      seqFilteredArray = filteredArray.slice(
        0,
        4 * 3 + 4 * Math.max(turn.current, moviesTurn)
      );
    } else if (size >= 993) {
      //12карт по 4 ряда по 3 в ряд + 3
      seqFilteredArray = filteredArray.slice(
        0,
        3 * 4 + 3 * Math.max(turn.current, moviesTurn)
      );
    } else if (size >= 757) {
      //8карт 4 ряда по 2 в ряд + 2
      seqFilteredArray = filteredArray.slice(
        0,
        2 * 4 + 2 * Math.max(turn.current, moviesTurn)
      );
    } else {
      //5 по 1 в ряд + 2
      seqFilteredArray = filteredArray.slice(0, 1 * 5 + 2 * turn.current);
    }

    btnVisible = filteredArray.length !== seqFilteredArray.length;

    return seqFilteredArray;
  };

  return (
    <main className='movies__body'>
      <form className='movies__top' onSubmit={handleSubmit}>
        <input
          className='movies__title'
          required
          placeholder='Фильм'
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
