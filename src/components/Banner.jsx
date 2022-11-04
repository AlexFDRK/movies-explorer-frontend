import '../index.css';
import React from 'react';
import bannerLogoPath from '../images/landinglogo.svg';

const Promo = ({ aboutBlock, techBlock, studentBlock, handleClick }) => {
  return (
    <section>
      <div className='banner__body'>
        <h1 className='banner__text'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img className='banner__logo' src={bannerLogoPath} alt='лого' />
      </div>
      <div className='banner__footer'>
        <ul className='banner__navigator'>
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
        </ul>
      </div>
    </section>
  );
};

export default Promo;
