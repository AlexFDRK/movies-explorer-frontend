import '../index.css';

import mePath from '../images/alex.jpeg';
import arrowPath from '../images/arrow.svg';
import React from 'react';

const Student = ({ studentBlock }) => {
  const goToStatSite = (value) => {
    if (value === 'travel') {
      window.open('https://alexfdrk.github.io/russian-travel', '_blank').focus;
    } else if (value === 'adopt') {
      window.open('https://alexfdrk.github.io/mesto/index.html', '_blank')
        .focus;
    } else if (value === 'single') {
      window.open('https://alexfdrk.github.io/first-project/', '_blank').focus;
    } else if (value === 'git') {
      window.open('https://github.com/AlexFDRK', '_blank').focus;
    }
  };

  return (
    <section className='student' ref={studentBlock}>
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
          <div className='student__git link' onClick={() => goToStatSite('git')}>Github</div>
        </div>
        <div className='student__frame'>
          <img className='student__photo' src={mePath} alt='Фото' />
        </div>
      </div>
      <div className='student__portfolio'>
        <div className='student__grey-header'>Портфолио</div>
        <ul className='student__list'>
          <li
            className='student__block link'
            onClick={() => goToStatSite('travel')}
          >
            <div className='student__work'>Статичный сайт</div>
            <img className='student__arrow' src={arrowPath} alt='стрелка' />
            <hr className='line student__line' />
          </li>
          <li
            className='student__block link'
            onClick={() => goToStatSite('adopt')}
          >
            <div className='student__work'>Адаптивный сайт</div>
            <img className='student__arrow' src={arrowPath} alt='стрелка' />
            <hr className='line student__line' />
          </li>
          <li
            className='student__block link'
            onClick={() => goToStatSite('single')}
          >
            <div className='student__work'>Одностраничное приложение</div>
            <img className='student__arrow' src={arrowPath} alt='стрелка' />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Student;
