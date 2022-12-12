import '../index.css';
import LogForm from '../components/LogForm';
import { Link } from 'react-router-dom';
import React from 'react';

const Login = ({ setSubmitErrorText, submitErrorText, onSubmit }) => {
  return (
    <LogForm
      caption='Рады видеть!'
      isItMissing='none'
      btnText='Войти'
      setSubmitErrorText={setSubmitErrorText}
      submitErrorText={submitErrorText}
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
