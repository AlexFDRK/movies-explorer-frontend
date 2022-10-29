import '../index.css';
import React from 'react';
import logoPath from '../images/logo.svg';
import bannerLogoPath from '../images/landinglogo.svg';
import { Link, useHistory } from 'react-router-dom';

const Promo = ({ aboutBlock, techBlock, studentBlock, handleClick }) => {
  const history = useHistory();
  const btnClick = () => {
    history.push('/signin');
  };

  return (
    <section>
      <div className='banner__header'>
        <img className='logo' src={logoPath} alt='лого' />
        <div className='banner__menu'>
          <Link className='link text_menu color_white' to='/signup'>
            Регистрация
          </Link>
          <button className='banner__button' onClick={btnClick}>
            Войти
          </button>
        </div>
      </div>
      <div className='banner__body'>
        <h1 className='banner__text'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img className='banner__logo' src={bannerLogoPath} alt='лого' />
      </div>
      <div className='banner__footer'>
        <div className='banner__navigator'>
          <li
            className='text_menu link'
            onClick={() => handleClick(aboutBlock)}
          >
            О проекте
          </li>
          <li className='text_menu link' onClick={() => handleClick(techBlock)}>
            Технологии
          </li>
          <li
            className='text_menu link'
            onClick={() => handleClick(studentBlock)}
          >
            Студент
          </li>
        </div>
      </div>
    </section>
  );
};

export default Promo;
