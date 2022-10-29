import React from 'react';
import '../index.css';
import logoPath from '../images/logo.svg';
import { useState } from 'react';

const LogForm = ({ caption, isItMissing, btnText, children, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');

  const areTwoFields = isItMissing === 'none' ? true : false;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setMail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (areTwoFields ? false : !name || !email || !password) {
      return;
    }

    if (areTwoFields) {
      onSubmit(email, password);
    } else {
      onSubmit(name, email, password);
    }
  }

  return (
    <form className='login' noValidate onSubmit={handleSubmit}>
      <div className='login__main'>
        <div className='login__top'>
          <img className='login__logo' src={logoPath} alt='лого' />
          <h2 className='text_caption login__caption'>{caption}</h2>
        </div>
        <div className='login__middle'>
          <div className={`text_tag login__tag ${isItMissing}`}>Имя</div>
          <input
            className={`text_password login__input ${isItMissing}`}
            placeholder='Имя'
            type='string'
            onChange={handleNameChange}
            value={name || ''}
          />
          <div className='text_tag login__tag'>E-mail</div>
          <input
            className='text_password login__input'
            placeholder='pochta@yandex.ru|'
            type='email'
            onChange={handleEmailChange}
            value={email || ''}
          />
          <div className='text_tag login__tag'>Пароль</div>
          <input
            className='text_password login__imput_last'
            placeholder='**********'
            type='password'
            onChange={handlePasswordChange}
            value={password || ''}
          />
          <div className='text_tag colo_red'>Что-то пошло не так...</div>
        </div>
        <div className='login__bottom'>
          <button type='submit' className='login__button'>
            {btnText}
          </button>
          <div className='login__group'>{children}</div>
        </div>
      </div>
    </form>
  );
};

export default LogForm;
