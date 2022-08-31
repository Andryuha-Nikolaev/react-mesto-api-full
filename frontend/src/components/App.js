import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirm from './PopupWithConfitm';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

import CurrentUserContext from '../contexts/CurrentUserContext';

import api from "../utils/api";
import * as auth from '../utils/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profileEmail, setProfileEmail] = useState('');
  const [removedCardId, setRemovedCardId] = useState('');
  const history = useHistory();

  //Проверка токена и авторизация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then(res => {
          if (res) {
            setIsLoggedIn(true)
            history.push('/')
            setProfileEmail(res.data.email)
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo().then((profileInfo) => {
        setCurrentUser(profileInfo)
      })
        .catch((err) => {
          console.log(err);
        })

      api.getCards().then((cardsData) => {
        setCards(cardsData)
      })
        .catch((err) => {
          console.log(err);
        })
      }

  }, [isLoggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
    setIsInfoTooltipPopupOpen(false)
    setIsConfirmPopupOpen(false)
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api.setUserInfo(newUserInfo).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api.setUserAvatar(newAvatar).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleCardDeleteClick = (cardId) => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setRemovedCardId(cardId);
  };

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((item) => item._id !== card._id))
      closeAllPopups()
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.postCard(data).then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //регистрация пользователя
  function handleRegister(email, password) {
    auth.register(email, password)
      .then(res => {
        if (res) {
          setIsSuccess(true);
          setIsInfoTooltipPopupOpen(true);
          history.push('./sign-in');
        }
      })
      .catch(err => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      })
  }

  //авторизация пользователя
  function handleAuthorize(email, password) {
    auth.authorize(email, password)
      .then(res => {
        if (res) {
          setIsLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          history.push('./');
        }
      })
      .catch(err => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      })
  }

  // Выход
  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header
            onSignOut={handleSignOut}
            userEmail={profileEmail} />
          <Switch>
            <Route path="/sign-in">
              <Login onAuthorize={handleAuthorize} />
            </Route>

            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <ProtectedRoute
              path="/"
              loggedIn={isLoggedIn}
              component={Main}
              onEditProfile={setIsEditProfilePopupOpen}
              onAddPlace={setIsAddPlacePopupOpen}
              onEditAvatar={setIsEditAvatarPopupOpen}
              onCardClick={setSelectedCard}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDeleteClick}
            />
          </Switch>

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading} />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading} />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            isSuccess={isSuccess} onClose={closeAllPopups} />
          <PopupWithConfirm
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            card={removedCardId}
            onLoading={isLoading} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
