import '../index.css';
import React from 'react';
// import Preloader from './Preloader';

const Card = ({ card }) => {
  return (
    <section className='element'>
      <div className='element__frame'>
        <img className='element__picture' src={card} alt='фильм' />
        {/* <Preloader /> */}
      </div>
      <div className='element__group'>
        <div className='element__bunch'>
          <h3 className='element__caption'>Заголовок</h3>
          <div className='element__circle'>
            <div className='element__green' />
          </div>
        </div>
        <span className='element__duration'>1ч42м</span>
      </div>
    </section>
  );
};

export default Card;
