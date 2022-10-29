import '../index.css';

import mePath from '../images/alex.jpeg';
import arrowPath from '../images/arrow.svg';
import React from 'react';

const Student = ({ studentBlock }) => {
  return (
    <div className='student' ref={studentBlock}>
      <div className='about__top'>
        <h2 className='about__header'>Студент</h2>
        <hr className='line' />
      </div>
      <div className='student__group'>
        <div className='student__description'>
          <h2 className='text_title student__title'>AlexFDRK</h2>
          <h3 className='student__signature'>Фронтенд-разработчик, 51 годик</h3>
          <p className='text_main student__text'>
            Живу в г.Москва, работаю программистом 1С (руководитель отдела).
            Ненавижу войну. Если придется уехать из страны, нужны знания в
            чём-то менее специфическом, напрмер в веб-разработке.
          </p>
          <div className='student__git'>Github</div>
        </div>
        <div className='student__frame'>
          <img className='student__photo' src={mePath} alt='Фото' />
        </div>
      </div>
      <div className='student__portfolio'>
        <div className='student__grey-header'>Портфолио</div>
        <div className='student__block'>
          <li className='student__work'>Статичный сайт</li>
          <img className='student__arrow link' src={arrowPath} alt='стрелка' />
        </div>
        <hr className='line student__line' />
        <div className='student__block'>
          <li className='student__work'>Адаптивный сайт</li>
          <img className='student__arrow link' src={arrowPath} alt='стрелка' />
        </div>
        <hr className='line student__line' />
        <div className='student__block'>
          <li className='student__work'>Одностраничное приложение</li>
          <img className='student__arrow link' src={arrowPath} alt='стрелка' />
        </div>
      </div>
    </div>
  );
};

export default Student;
