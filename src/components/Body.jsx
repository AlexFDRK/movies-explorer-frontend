/*eslint-disable*/
import '../index.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Card from './Card';
import findPic from '../images/find.svg';
import Preloader from './Preloader';

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
}) => {
  const location = useLocation();
  const [filterText, setFilterText] = useState('');
  const [short, setShort] = useState(false);
  const [size, setSize] = useState(window.innerWidth);
  const [moviesTurn, setMoviesTurn] = useState(0);
  var btnVisible = false;

  const handleResize = React.useCallback(() => {
    setTimeout(setSize(window.innerWidth), 1000);
  }, [size]);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  useEffect(() => {
    if (filterAppText !== '') {
      setFilterText('');
    }
  }, []);

  useEffect(() => {
    if (!itSavedFilms) {
      setFilterText(filterAppText);
    }
  }, [filterAppText]);

  useEffect(() => {
    setShort(moviesIsShort);
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

    handleFilmSubmit(filterText, short);
  }

  const makeTurnClick = React.useCallback(() => {
    setMoviesTurn(moviesTurn + 1);
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
      seqFilteredArray = filteredArray.slice(0, 4 * 3 + 4 * moviesTurn);
    } else if (size >= 993) {
      //12карт по 4 ряда по 3 в ряд + 3
      seqFilteredArray = filteredArray.slice(0, 3 * 4 + 3 * moviesTurn);
    } else if (size >= 757) {
      //8карт 4 ряда по 2 в ряд + 2
      seqFilteredArray = filteredArray.slice(0, 2 * 4 + 2 * moviesTurn);
    } else {
      //5 по 1 в ряд + 2
      seqFilteredArray.slice(0, 1 * 5 + 2 * moviesTurn);
    }

    btnVisible = (filteredArray.length !== seqFilteredArray.length);

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
