import '../index.css';
import Header from '../components/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

const Profile = ({ click }) => {
  const [editable, setEditable] = useState(false);
  const handleEditClick = () => {
    setEditable(!editable);
  };

  return (
    <div>
      <Header click={click} />
      <div className='profile'>
        <h2 className='text_caption profile__caption'>Привет, Виталий!</h2>
        <div className='profile__main'>
          <div className='profile__group'>
            <span className='profile__text'>Имя</span>
            <input
              className='profile__text profile__field'
              placeholder='Виталий'
              readOnly={editable ? '' : 'readonly'}
              type='string'
            />
          </div>
          <hr className='profile__line' />
          <div className='profile__group'>
            <span className='profile__text'>E-mail</span>
            <input
              className='profile__text profile__field'
              placeholder='pochta@yandex.ru'
              readOnly={editable ? '' : 'readonly'}
              type='string'
            />
          </div>
        </div>
        <div className='profile__footer'>
          <li className='link profile__link' onClick={handleEditClick}>
            Редактировать
          </li>
          <Link to='/signup' className='link profile__link color_red'>
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
