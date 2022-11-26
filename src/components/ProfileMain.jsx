import '../index.css';
import React from 'react';

import { useContext, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const ProfileMain = ({ handleExitClick }) => {
  const currentContextData = useContext(CurrentUserContext);
  const currentUser = currentContextData.currentUser;
  const [editable, setEditable] = useState(false);
  const handleEditClick = () => {
    setEditable(!editable);
  };

  return (
    <main className='profile'>
      <h2 className='text_caption profile__caption'>Привет, {currentUser.name}!</h2>
      <div className='profile__main'>
        <div className='profile__group'>
          <span className='profile__text'>Имя</span>
          <input
            className='profile__text profile__field'
            value={currentUser.name || ''}
            readOnly={editable ? '' : 'readonly'}
            type='string'
          />
        </div>
        <hr className='profile__line' />
        <div className='profile__group'>
          <span className='profile__text'>E-mail</span>
          <input
            className='profile__text profile__field'
            value={currentUser.email || ''}
            readOnly={editable ? '' : 'readonly'}
            type='string'
          />
        </div>
      </div>
      <div className='profile__footer'>
        <div className='link profile__link' onClick={handleEditClick}>
          Редактировать
        </div>
        <div className='link profile__link color_red' onClick={handleExitClick}>
          Выйти из аккаунта
        </div>
      </div>
    </main>
  );
};

export default ProfileMain;
