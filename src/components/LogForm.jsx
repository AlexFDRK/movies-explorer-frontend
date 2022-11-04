/* eslint-disable */
import React from 'react';
import '../index.css';
import logoPath from '../images/logo.svg';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const LogForm = ({
  caption,
  isItMissing,
  btnText,
  children,
  onSubmit,
  validateFunction,
}) => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [validateName, setValidateName] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [errorMsg, setErrorMessage] = useState('');

  const areTwoFields = isItMissing === 'none' ? true : false;

  useEffect(() => {
    let errorFound = false;
    let count = 0;
    let tmpMessage = 'Ошибка требуемого формата в :';

    if (!validateName && !areTwoFields) {
      tmpMessage = tmpMessage + 'Имени';
      count++;
      errorFound = true;
    }
    if (!validateEmail) {
      if (count > 0) {
        tmpMessage = tmpMessage + ',';
      }
      tmpMessage = tmpMessage + ' Почте';
      count++;
      errorFound = true;
    }
    if (!validatePassword) {
      if (count > 0) {
        tmpMessage = tmpMessage + ',';
      }
      tmpMessage = tmpMessage + ' Пароле';
      errorFound = true;
    }

    if(errorFound){
      setErrorMessage(tmpMessage);
    }else{
      setErrorMessage('');
    }
  }, [name, email, password]);

  const handleNameChange = (e) => {
    setName(e.target.value);

    if (areTwoFields) {
      setValidateName(true);
    } else {
      setValidateName(validateFunction(e.target));
    }
  };

  const handleEmailChange = (e) => {
    setMail(e.target.value);
    setValidateEmail(validateFunction(e.target));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValidatePassword(validateFunction(e.target));
  };

  const handleLoginClick = () => {
    history.push('/');
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
          <img
            className='login__logo'
            src={logoPath}
            onClick={handleLoginClick}
            alt='лого'
          />
          <h2 className='text_caption login__caption'>{caption}</h2>
        </div>
        <div className='login__middle'>
          <div className={`login__fields ${isItMissing}`}>
            <div className='text_tag login__tag'>Имя</div>
            <div className='login__cover'>
              <input
                className={`text_password login__input ${!validateName?'color_red':''}`}
                placeholder='Имя'
                type='string'
                onChange={handleNameChange}
                value={name || ''}
                minLength = {2}
                maxLength = {30}
              />
            </div>
          </div>
          <div className='login__fields'>
            <div className='text_tag login__tag'>E-mail</div>
            <div className='login__cover'>
              <input
                className={`text_password login__input ${!validateEmail?'color_red':''}`}
                required
                placeholder='pochta@yandex.ru|'
                type='email'
                onChange={handleEmailChange}
                value={email || ''}
              />
            </div>
          </div>
          <div className='login__fields'>
            <div className='text_tag login__tag'>Пароль</div>
            <div className='login__cover'>
              <input
                className={`text_password login__input color_red`}
                required
                placeholder='**********'
                type='password'
                onChange={handlePasswordChange}
                value={password || ''}
                minLength = {2}
                maxLength = {30}
              />
            </div>
            <div className='text_tag login__error color_red'>
              {errorMsg}
              {/* Что-то пошло не так... */}
            </div>
          </div>
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
