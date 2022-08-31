import React from 'react';
import successImage from '../images/success-image.svg';
import unsuccessImage from '../images/unsuccess-image.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
    <div className="popup__container">
      <button id="success-close-button" type="button" className="popup__close-button" onClick={onClose}/>
      <img className="popup__signup-image" src={`${isSuccess ? successImage : unsuccessImage}`} alt="" />
      <h2 className="popup__signup-title">{`${isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
    </div>
  </div>
  )
}

export default InfoTooltip;
