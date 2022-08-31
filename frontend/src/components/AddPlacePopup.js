import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: enteredValues.title,
      link: enteredValues.link
    });
  }

  useEffect(() => {
    resetForm()
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="photo"
      title="Новое место"
      buttonText={onLoading ? `Сохранение` : `Создать`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isDisabled={!isFormValid}>
      <label className="form__field form__fild-first">
        <input
          name="title"
          className={errors.title ? 'form__input form__input_type_error' : "form__input"}
          id="photo-input"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={enteredValues.title || ''}
          onChange={handleChange} />
        <span className="form__input-error photo-input-error">{errors.title}</span>
      </label>
      <label className="form__field">
        <input
          name="link"
          className={errors.link ? 'form__input form__input_type_error' : "form__input"}
          id="link-input"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={enteredValues.link || ''}
          onChange={handleChange} />
        <span className="form__input-error link-input-error">{errors.link}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
