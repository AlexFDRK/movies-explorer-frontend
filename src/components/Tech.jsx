import '../index.css';
import React from 'react';

const Tech = ({ techBlock }) => {
  return (
    <section className='tech' ref={techBlock}>
      <div className='about__top'>
        <h2 className='about__header'>Технологии</h2>
        <hr className='line' />
      </div>
      <div className='tech__group'>
        <h2 className='text_title tech__title'>7 технологий</h2>
        <p className='text_main tech__text'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className='tech__footer'>
          <div className='tech__bar about__bartext'>HTML</div>
          <div className='tech__bar about__bartext'>CSS</div>
          <div className='tech__bar about__bartext'>JS</div>
          <div className='tech__bar about__bartext'>React</div>
          <div className='tech__bar about__bartext'>Git</div>
          <div className='tech__bar about__bartext'>Express.js</div>
          <div className='tech__bar about__bartext'>mongoDB</div>
        </div>
      </div>
    </section>
  );
};

export default Tech;
