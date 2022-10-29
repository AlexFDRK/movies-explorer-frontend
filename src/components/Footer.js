import '../index.css';
import React from 'react';

const Footer = () => {
  return (
    <div className='promo-footer'>
      <p className='promo-footer__description'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <hr className='line movies__line' />
      <div className='promo-footer__caption'>
        <p className='promo-footer__text'>© 2020</p>
        <div className='promo-footer__group'>
          <p className='promo-footer__text'>Яндекс.Практикум</p>
          <p className='promo-footer__text'>Github</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
