import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <form name="register" className="auth__form" id="register-form" noValidate onSubmit={handleSubmit}>
          <h2 className="auth__title">Регистрация</h2>
          <input name="email" className="auth__input" id="email-input" type="text" placeholder="Email" value={email} onChange={handleChangeEmail} />
          <input name="password" className="auth__input" id="password-input" type="password" placeholder="Пароль" value={password} onChange={handleChangePassword} />
          <button type="submit" className="auth__button-save" id="auth-button-save">Зарегистрироваться</button>
          <Link to="./sing-in" className="auth__button">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </div>
  )
}

export default Register;
