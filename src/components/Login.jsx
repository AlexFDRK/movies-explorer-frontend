import '../index.css';
import LogForm from '../components/LogForm';
import { Link } from 'react-router-dom';
import React from 'react';

const Login = ({ validateFunction, onSubmit }) => {
  return (
    <LogForm
      caption='Рады видеть!'
      isItMissing='none'
      btnText='Войти'
      validateFunction={validateFunction}
      onSubmit={onSubmit}
    >
      <div className='login__text_grey'>Ещё не зарегистрированы?</div>
      <Link to='/signup' className='link login__text_blue'>
        Регистрация
      </Link>
    </LogForm>
  );
};

export default Login;
