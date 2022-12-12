import React from 'react';
import '../index.css';
import { POPUP_OPENED } from '../utils/constants';
import cross from '../images/cross.svg';
import tick from '../images/tick.svg';

const PopupWithInfo = ({
  name,
  isOpen,
  onClose,
  isItPositive,
  errorDescription,
}) => {
  return (
    <section className={`popup ${isOpen && POPUP_OPENED}`}>
      <div className='popup__overlay'>
        <button
          type='button'
          className='popup__close'
          aria-label='Выход'
          onClick={onClose}
        />
        <form className='form form__info' name={name} noValidate>
          <img
            className='form__pictogram'
            alt={'pictogram'}
            src={isItPositive ? tick : cross}
          />
          <h3 className='form__title form__title_type_info'>
            {isItPositive
              ? 'Вы успешно зарегистрировались!'
              : errorDescription}
          </h3>
        </form>
      </div>
    </section>
  );
};

export default PopupWithInfo;
