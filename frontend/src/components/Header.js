import React, { useState } from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ userEmail, onSignOut }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleSignOut() {
    setIsMenuOpen(false);
    onSignOut();
  }

  return (
    <header className="header">
      <div className={`header__burger-info ${isMenuOpen ? "header__burger-info_opened" : ""}`}>
        <span className="header__email">{userEmail}</span>
        <button className="header__sign-out" onClick={handleSignOut} >Выйти</button>
      </div>
      <div className="header__container">
        <img className="header__logo" src={logo} alt="логотип" />
        {location.pathname === '/sign-in' && (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        )}
        {location.pathname === '/sign-up' && (
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        )}
        {location.pathname === '/' && (
          <>
            <button className={`header__menu-button ${isMenuOpen ? "header__menu-button_opened" : ""}`} onClick={() => handleToggleMenu()} ></button>
            <nav className="header__nav">
              <span className="header__email">{userEmail}</span>
              <button className="header__sign-out" onClick={() => onSignOut()}>Выйти</button>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}

export default Header;
