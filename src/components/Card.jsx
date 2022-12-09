import '../index.css';
import React from 'react';
import { MOMOREPARTIES } from '../utils/constants';

const Card = ({ card, likeMovieClick, isLiked, itSavedFilms, cross }) => {
  function stringTime(duration) {
    const h = Math.floor(duration / 60);
    const m = duration - h * 60;

    return h === 0
      ? String(m) + 'м'
      : String(h) + 'ч' + (m <= 9 ? '0' + String(m) : String(m)) + 'м';
  }

  function likeMovieCatch() {
    likeMovieClick(card);
  }

  function goToYouTube() {
    window.open(card.trailerLink, '_blank').focus;
  }

  return (
    <section className='element'>
      <div className='element__frame'>
        <img
          className='element__picture'
          src={itSavedFilms ? card.image : MOMOREPARTIES + card.image.url}
          alt={card.nameRU}
          onClick={() => goToYouTube()}
        />
      </div>
      <div className='element__group'>
        <div className='element__bunch'>
          <h3 className='element__caption'>{card.nameRU}</h3>
          <button
            type='button'
            className={cross ? 'element__cross' : 'element__circle'}
            onClick={likeMovieCatch}
          >
            {cross ? (
              ''
            ) : (
              <div
                className={`element__green ${
                  isLiked
                    ? 'element__green_mode_green'
                    : 'element__green_mode_grey'
                }`}
              />
            )}
          </button>
        </div>
        <span className='element__duration'>{stringTime(card.duration)}</span>
      </div>
    </section>
  );
};

export default React.memo(Card);
