import '../index.css';
import React from 'react';
import logoPath from '../images/logo.svg';
import { Link, useHistory } from 'react-router-dom';

const BunnerHead = () => {
  const history = useHistory();
  const btnClick = () => {
    history.push('/signin');
  };
  return (
    <header className='banner__header'>
      <img className='logo' src={logoPath} alt='лого' />
      <div className='banner__menu'>
        <Link className='link text_menu color_white' to='/signup'>
          Регистрация
        </Link>
        <button type='button' className='banner__button' onClick={btnClick}>
          Войти
        </button>
      </div>
    </header>
  );
};

export default BunnerHead;
