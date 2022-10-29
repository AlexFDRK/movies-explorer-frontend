import React from 'react';
import '../index.css';


const About = ({aboutBlock}) => {
  return (
    <div className='about' ref={aboutBlock}>
      <div className='about__top'>
        <h2 className='about__header'>О проекте</h2>
        <hr className='line' />
      </div>
      <div className='about__cell'>
        <h2 className='about__title'>Дипломный проект включал 5 этапов</h2>
        <p className='text_main about__text'>
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
      </div>
      <div className='about__cell'>
        <h2 className='about__title about__special'>На выполнение диплома ушло 5 недель</h2>
        <p className='text_main about__text'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className='about__footer'>
        <div className='about__short-bar about__bartext'>1 неделя</div>
        <div className='about__long-bar about__bartext'>4 недели</div>
        <div className='about__label about__bartext'>Back-end</div>
        <div className='about__label about__bartext'>Front-end</div>
      </div>
    </div>
  );
};

export default About;
