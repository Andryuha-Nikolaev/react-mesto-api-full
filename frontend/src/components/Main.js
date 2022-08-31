import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар пользователя" />
          <button type="button" className="profile__avatar-button" id="avatar-button" aria-label="изменить аватар" onClick={() => { onEditAvatar(true) }}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__caption">{currentUser.about}</p>
          <button type="button" className="profile__edit-button" id="edit-button" aria-label="редактировать профиль" onClick={() => { onEditProfile(true) }}></button>
        </div>
        <button type="button" className="profile__add-button" id="add-button" aria-label="добавить фотографии" onClick={() => { onAddPlace(true) }}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
