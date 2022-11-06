import '../index.css';
import Card from './Card';
import findPic from '../images/find.svg';
import React from 'react';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Body = ({ movies, makeTurnClick, findFilmSubmit }) => {
  const location = useLocation();
  const [short, setShort] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const [film, setFilm] = useState('');

  useEffect(() => {
    setBtnVisible(makeTurnClick === undefined ? false : true);
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case '/movies':
        setBtnVisible(true);
        break;
      case '/saved-movies':
        setBtnVisible(false);
        break;
      default:
        break;
    }
  }, [location]);

  const clickShort = () => {
    setShort(!short);
  };

  const handleFilmChange = (e) => {
    setFilm(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!film) {
      return;
    }

    findFilmSubmit(film);
  }

  let i = 1;

  return (
    <main className='movies__body'>
      <form className='movies__top' onSubmit={handleSubmit}>
        <input
          className='movies__title'
          required
          placeholder='Фильм'
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
      <div className='elements'>
        {movies.map((item) => (
          <Card card={item} key={i++} />
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
    </main>
  );
};

export default Body;
