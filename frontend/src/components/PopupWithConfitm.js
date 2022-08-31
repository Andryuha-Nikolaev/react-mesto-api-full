import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithConfirm({ isOpen, onClose, onSubmit, onLoading, card }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Удалить?"
      buttonText={onLoading ? `Удаление...` : `Удалить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}>
    </PopupWithForm>
  )
}

export default PopupWithConfirm;
