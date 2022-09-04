import checkResponse from "./utils";

class Api {
  constructor(options) {//конструктор принимает url сервера и заголовки запроса
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  // метод изменяет данные профиля на сервере
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',//метод запроса
      headers: this._headers,//заголовки запроса
      body: JSON.stringify({//тело запроса
        name: data.name,//в name передаем значение name объекта, переданного в setUserInfo
        about: data.about//в about передаем значение about объекта, переданного в setUserInfo
      })
    }).then((res) => checkResponse(res))
  }

  // метод изменяет аватар на сервере
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then((res) => checkResponse(res))
  }

  // метод делает запрос серверу и получает данные профиля
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        // authorization: '6634f396-3fbd-4a4f-858c-8c72fb67fb49',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => checkResponse(res))
  }

  // метод получения карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        // authorization: '6634f396-3fbd-4a4f-858c-8c72fb67fb49',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => checkResponse(res))
  }

  // метод добавления новой карточки на сервер
  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => checkResponse(res))
  }

  // метод удаления карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => checkResponse(res))
  }

  //лайк-дизлайк
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers,
    }).then((res) => checkResponse(res))
  }
}

const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  baseUrl: 'https://api.domainname.andrey.nomoredomains.sbs',
  headers: {
    // authorization: '6634f396-3fbd-4a4f-858c-8c72fb67fb49',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default api;
