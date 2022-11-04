import '../index.css';
import Card from './Card';
import findPic from '../images/find.svg';
import React from 'react';

import { useState, useEffect } from 'react';

const Body = ({ movies, makeTurnClick }) => {
  const [short, setShort] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    setBtnVisible(makeTurnClick === undefined ? false : true);
  }, []);

  const clickShort = () => {
    console.log(makeTurnClick);
    setShort(!short);
  };

  let i = 1;

  return (
    <main className='movies__body'>
      <form className='movies__top'>
        <input className='movies__title' required placeholder='Фильм' type='string' />
        <button type='button' className='movies__search link'>
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
