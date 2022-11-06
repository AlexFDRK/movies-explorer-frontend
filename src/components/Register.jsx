import '../index.css';
import LogForm from '../components/LogForm';
import { Link } from 'react-router-dom';
import React from 'react';

const Register = ({ validateFunction, onSubmit }) => {
  return (
    <LogForm
      caption='Добро пожаловать!'
      isItMissing=''
      btnText='Зарегистрироваться'
      validateFunction={validateFunction}
      onSubmit={onSubmit}
    >
      <div className='login__text_grey'>Уже зарегистрированы?</div>
      <Link to='/signin' className='link login__text_blue'>
        Войти
      </Link>
    </LogForm>
  );
};

export default Register;
