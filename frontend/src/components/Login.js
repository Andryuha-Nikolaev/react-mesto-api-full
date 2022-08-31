import React, {useState} from 'react';

function Login({ onAuthorize }) {
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
    onAuthorize(email, password);
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <form name="login" className="auth__form" id="login-form" noValidate onSubmit={handleSubmit}>
          <h2 className="auth__title">Вход</h2>
          <input name="login-email" className="auth__input" id="login-email-input" type="text" placeholder="Email" value={email} onChange={handleChangeEmail} />
          <input name="login-password" className="auth__input" id="login-password-input" type="password" placeholder="Пароль" value={password} onChange={handleChangePassword} />
          <button type="submit" className="auth__button-save" id="auth-button-save-login">Войти</button>
          <button type="button" className="auth__button" id="auth-button-login" style={{ cursor: 'auto' }}></button>
        </form>
      </div>
    </div>
  )
}

export default Login;
