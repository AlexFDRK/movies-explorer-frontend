import '../index.css';
import profilePic from '../images/profile_pic.svg';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Slide = ({ isSliderVisible, clickSlider }) => {
  const history = useHistory();

  const handleProfileClick = (path) => {
    clickSlider();
    history.push(path);
  };

  return (
    <section>
      <div
        className={`slide__dim ${isSliderVisible ? '' : 'slide__dim_on'}`}
      ></div>
      <div className={`slide ${isSliderVisible ? 'slide__move_on' : ''}`}>
        <button
          type='button'
          className='slide__close'
          aria-label='Выход'
          onClick={clickSlider}
        />
        <ul className='header__navigation'>
          <li
            className='header__text slide__link'
            onClick={() => {
              handleProfileClick('/');
            }}
          >
            Главная
          </li>
          <li
            className='header__text slide__link'
            onClick={() => {
              handleProfileClick('/movies');
            }}
          >
            Фильмы
          </li>
          <li
            className='header__text slide__link'
            onClick={() => {
              handleProfileClick('/saved-movies');
            }}
          >
            Сохранённые фильмы
          </li>
        </ul>
        <ul className='header__account'>
          <li
            className='header__caption slide__link last'
            onClick={() => {
              handleProfileClick('/profile');
            }}
          >
            Аккаунт
          </li>
          <button
            type='button'
            className='header__button'
            onClick={() => {
              handleProfileClick('/profile');
            }}
          >
            <img className='header__pic' src={profilePic} alt='Профиль' />
          </button>
        </ul>
      </div>
    </section>
  );
};

export default Slide;
