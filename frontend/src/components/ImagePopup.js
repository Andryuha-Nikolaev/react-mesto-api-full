import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_view-image ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <img src={card.link} alt={card.name} className="popup__image" />
        <h3 className="popup__description">{card.name}</h3>
        <button id="image-close-button" type="button" className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;
