import '../index.css';
import { Link } from 'react-router-dom';
import logoPath from '../images/logo.svg';
import profilePic from '../images/profile_pic.svg';
import burgerPath from '../images/burger.svg';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Header = ({ isItHidden, click }) => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/');
  };

  const handleClick = () => {
    click();
  };

  return (
    <header className={`header ${isItHidden}`}>
      <img className='header__logo' src={logoPath} onClick={handleLoginClick} alt='лого' />
      <div className='header__menu'>
        <nav className='header__navigation'>
          <Link to='/movies' className='header__menu-text link color_black'>
            Фильмы
          </Link>
          <Link to='/saved-movies' className='header__menu-text link color_black'>
            Сохранённые фильмы
          </Link>
        </nav>
        <nav className='header__account'>
          <Link to='/profile' className='header__menu-text link color_black'>
            Аккаунт
          </Link>
          <button className='header__button'>
            <img className='header__pic' src={profilePic} alt='лого' />
          </button>
        </nav>
      </div>
      <img
        className='header__burger'
        src={burgerPath}
        onClick={handleClick}
        alt='бургер'
      />
    </header>
  );
};

export default Header;
