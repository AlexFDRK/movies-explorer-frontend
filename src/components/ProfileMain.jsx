import '../index.css';
import React from 'react';

import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import validateFunction from '../utils/validateFunction';

const ProfileMain = ({ handleExitClick, handleChangeClick, submitErrorText }) => {
  const currentContextData = useContext(CurrentUserContext);
  const currentUser = currentContextData.currentUser;
  const [editable, setEditable] = useState(false);
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState({});
  const [errorMsg, setErrorMessage] = useState('');

  useEffect(() => {
    setValues({
      ['name']: currentUser.name,
      ['email']: currentUser.email,
    });
    setIsValid({
      ['name']: true,
      ['email']: true,
    });
    console.log(submitErrorText);
  }, []);

  const checkChanges = () => {
    if (
      isValid['name'] &&
      isValid['email'] &&
      (values['name'] !== currentUser.name ||
        values['email'] !== currentUser.email)
    ) {
      return true;
    }

    return false;
  };

  const handleEditClick = () => {
    if (checkChanges()) {
      handleChangeClick(values['name'], values['email']);
    }
    setEditable(false);
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
    setIsValid({ ...isValid, [name]: validateFunction(target) });
  };

  useEffect(() => {
    setErrorMessage('');
    let errorFound = false;
    let count = 0;
    let tmpMessage = 'Ошибка формата в :';

    if (!isValid['name']) {
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

    if (errorFound) {
      setErrorMessage(tmpMessage);
    } else {
      setErrorMessage('');
    }

    if (checkChanges()){
      setEditable(true); 
    }else{
      setEditable(false); 
    }
  }, [values]);

  return (
    <form className='profile' noValidate>
      <h2 className='text_caption profile__caption'>
        Привет, {currentUser.name}!
      </h2>
      <div className='profile__main'>
        <div className='profile__group'>
          <span className='profile__text'>Имя</span>
          <input
            className='profile__text profile__field'
            value={values['name'] || ''}
            name='name'
            type='string'
            minLength={2}
            maxLength={30}
            onChange={handleChange}
          />
        </div>
        <hr className='profile__line' />
        <div className='profile__group'>
          <span className='profile__text'>E-mail</span>
          <input
            className='profile__text profile__field'
            value={values['email'] || ''}
            name='email'
            type='email'
            onChange={handleChange}
          />
        </div>
        <div className='text_tag login__error color_red'>
          {errorMsg === '' ? '' : errorMsg}
          {/* Что-то пошло не так... */}
        </div>
      </div>
      <div className='profile__footer'>
        <div className={`link profile__link ${editable ? '' : 'profile__link_mode_inactive'}`} onClick={handleEditClick} >
          {editable ? 'Сохранить' : 'Редактировать'}
        </div>
        <div className='link profile__link color_red' onClick={handleExitClick}>
          Выйти из аккаунта
        </div>
      </div>
    </form>
  );
};

export default ProfileMain;
