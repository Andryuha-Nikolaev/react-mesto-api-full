import React, { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useForm from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading  }) {
  const currentUser = useContext(CurrentUserContext);

  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: enteredValues.name,
      about: enteredValues.about,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isDisabled={!isFormValid}>
      <label className="form__field form__fild-first">
        <input
          name="name"
          className={errors.name ? 'form__input form__input_type_error' : "form__input"}
          id="name-input"
          type="text"
          placeholder="имя"
          minLength="2"
          maxLength="40"
          required
          value={enteredValues.name || ''}
          onChange={handleChange} />
        <span className="form__input-error name-input-error">{errors.name}</span>
      </label>
      <label className="form__field">
        <input
          name="about"
          className={errors.about ? 'form__input form__input_type_error' : "form__input"}
          id="about-input"
          type="text"
          placeholder="о себе"
          minLength="2"
          maxLength="200"
          required
          value={enteredValues.about || ''}
          onChange={handleChange} />
        <span className="form__input-error about-input-error">{errors.about}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
