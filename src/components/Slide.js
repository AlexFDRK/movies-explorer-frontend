import '../index.css';
import profilePic from '../images/profile_pic.svg';
import React from 'react';

const Slide = ({ isSliderVisible, clickSlider }) => {
  return (
    <div>
      <div
        className={`slide__dim ${isSliderVisible ? '' : 'slide__dim_on'}`}
      ></div>
      <div
        className={`slide ${isSliderVisible ? 'slide__move_on' : ''}`}
      >
        <button
          type='button'
          className='slide__close'
          aria-label='Выход'
          onClick={clickSlider}
        />
        <nav className='header__navigation'>
          <li className='header__text slide__link'>Главная</li>
          <li className='header__text slide__link'>Фильмы</li>
          <li className='header__text slide__link'>Сохранённые фильмы</li>
        </nav>
        <nav className='header__account'>
          <li className='header__caption slide__link last'>Аккаунт</li>
          <button className='header__button'>
            <img className='header__pic' src={profilePic} alt='лого' />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Slide;
