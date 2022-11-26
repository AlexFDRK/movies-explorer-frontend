///*eslint-disable*/
import '../index.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Card from './Card';
import findPic from '../images/find.svg';
import Preloader from './Preloader';

const Body = ({
  // makeTurnClick,
  localMovies,
  // savedMoviesId,
  showPreloader,
  handleFilmSubmit,
  likeMovieClick,
}) => {
  const location = useLocation();
  const [filterText, setFilterText] = useState('');
  const [short, setShort] = useState(false);
  // const [btnVisible, setBtnVisible] = useState(false);
  
  useEffect(() => {
    console.log(localMovies);
  }, [localMovies]);

  useEffect(() => {
    console.log('text was changed');
    // setBtnVisible(makeTurnClick === undefined ? false : true);
  }, [filterText]);

  useEffect(() => {
    switch (location.pathname) {
      case '/movies':
        // setBtnVisible(true);
        break;
      case '/saved-movies':
        // setBtnVisible(false);
        break;
      default:
        break;
    }
  }, [location]);

  const clickShort = () => {
    setShort(!short);
  };

  const handleFilmChange = (e) => {
    setFilterText(e.target.value);
  };

  const getText = React.useCallback(() => {
    return filterText;
  },[filterText]);

  const getShort = React.useCallback(() => {
    return short;
  },[short]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!filterText) {
      return;
    }

    handleFilmSubmit(filterText, short);
  };

  const filteredArr = () => {
    return localMovies.filter(
      (value) =>
        value.nameRU.toLowerCase().includes(filterText.toLowerCase()) &&
        (short ? value.duration < 40 : true)
    );
  };

  return (
    <main className='movies__body'>
      {/* <form className='movies__top' onSubmit={handleSubmit}> */}
      <form className='movies__top'>
        <input
          className='movies__title'
          required
          placeholder='Фильм'
          value={getText() || ''}
          type='string'
          onChange={handleFilmChange}
        />
        <button
          type='submit'
          className='movies__search link'
          onClick={handleSubmit}
        >
          <img className='movies__find' src={findPic} alt='поиск' />
        </button>
      </form>
      <hr className='line movies__line' />
      <div className='movies__group'>
        <div
          className={`movies__short ${
            getShort() ? 'movies__short_on' : 'movies__short_off'
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
      ) : (
        <div>
          <div className='elements'>
            {filteredArr().map((item) => (
              <Card
                card={item}
                key={item.id}
                likeMovieClick={likeMovieClick}
                // isLiked={savedMoviesId.includes(item.id)}
              />
            ))}
          </div>
          {/* <button
            type='button'
            className={`movies__button ${
              btnVisible ? '' : 'movies__button_hidden'
            }`}
            onClick={makeTurnClick}
          >
            Ещё
          </button> */}
        </div>
      )}
    </main>
  );
};

export default React.memo(Body);
