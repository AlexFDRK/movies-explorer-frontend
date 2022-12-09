import React from 'react';
import '../index.css';
import logoPath from '../images/logo.svg';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import validateFunction from '../utils/validateFunction';

const LogForm = ({
  caption,
  isItMissing,
  btnText,
  children,
  onSubmit,
  setSubmitErrorText,
  submitErrorText,
}) => {
  const history = useHistory();
  const [errorMsg, setErrorMessage] = useState('');
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const areTwoFields = isItMissing === 'none' ? true : false;

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
    setIsValid({ ...isValid, [name]: validateFunction(target) });
  };

  useEffect(() => {
    setSubmitErrorText('');
    let errorFound = false;
    let count = 0;
    let tmpMessage = 'Ошибка формата в :';

    if (!isValid['name'] && !areTwoFields) {
      tmpMessage = tmpMessage + 'Имени';
      count++;
      errorFound = true;
    }
    if (!isValid['email']) {
      if (count > 0) {
        tmpMessage = tmpMessage + ',';
      }
      tmpMessage = tmpMessage + ' Почте';
      count++;
      errorFound = true;
    }
    if (!isValid['password']) {
      if (count > 0) {
        tmpMessage = tmpMessage + ',';
      }
      tmpMessage = tmpMessage + ' Пароле';
      errorFound = true;
    }

    if (errorFound) {
      setErrorMessage(tmpMessage);
      setIsFormValid(false);
    } else {
      setErrorMessage('');
      setIsFormValid(true);
    }
  }, [values]);

  const handleLoginClick = () => {
    history.push('/');
  };

  function handleSubmit(evnt) {
    evnt.preventDefault();

    if (
      areTwoFields ? !values['email'] || !values['password'] : !values['name'] || !values['email'] || !values['password']
    ) {
      return;
    }

    if (areTwoFields) {
      onSubmit(values['email'], values['password']);
    } else {
      onSubmit(values['name'], values['email'], values['password']);
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
                className={`text_password login__input ${
                  !isValid['name'] ? 'color_red' : ''
                }`}
                placeholder='Имя'
                type='string'
                name='name'
                onChange={handleChange}
                value={values['name'] || ''}
                minLength={2}
                maxLength={30}
              />
            </div>
          </div>
          <div className='login__fields'>
            <div className='text_tag login__tag'>E-mail</div>
            <div className='login__cover'>
              <input
                className={`text_password login__input ${
                  !isValid['email'] ? 'color_red' : ''
                }`}
                required
                placeholder='pochta@yandex.ru|'
                type='email'
                name='email'
                onChange={handleChange}
                value={values['email'] || ''}
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
                name='password'
                onChange={handleChange}
                value={values['password'] || ''}
                minLength={2}
                maxLength={30}
              />
            </div>
            <div className='text_tag login__error color_red'>
              {errorMsg === '' ? submitErrorText : errorMsg}
              {/* Что-то пошло не так... */}
            </div>
          </div>
        </div>
        <div className='login__bottom'>
          <button
            type='submit'
            className={`login__button ${
              isFormValid ? '' : 'login__button_status_inactive'
            }`}
          >
            {btnText}
          </button>
          <div className='login__group'>{children}</div>
        </div>
      </div>
    </form>
  );
};

export default LogForm;
