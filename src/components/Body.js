import '../index.css';
import Card from './Card';
import findPic from '../images/find.svg';
import React from 'react';

import { useState } from 'react';

const Body = ({ movies, makeTurnClick }) => {
  const [short, setShort] = useState(false);

  const clickShort = () => {
    setShort(!short);
  };

  let i = 1;

  return (
    <div className='movies__body'>
      <div className='movies__top'>
        <h2 className='movies__title'>Фильм</h2>
        <button className='movies__search link'>
          <img className='movies__find' src={findPic} alt='поиск' />
        </button>
      </div>
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
      <div className='movies__button' onClick={makeTurnClick}>
        Ещё
      </div>
    </div>
  );
};

export default Body;
