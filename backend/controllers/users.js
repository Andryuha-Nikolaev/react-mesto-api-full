const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');
const Conflicted = require('../errors/conflicted');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  CREATED_CODE,
} = require('../errors/statusCode');

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => res.status(CREATED_CODE).send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((e) => {
      if (e.code === 11000) {
        next(new Conflicted('Такой пользователь уже существует'));
      } else if (e.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'));
      } else {
        next(e);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );

      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Запрашиваемый пользователь не найден'));
      } else {
        next(e);
      }
    });
};//

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};//

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Запрашиваемый пользователь не найден'));
      } else {
        next(e);
      }
    });
};//

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(e);
      }
    });
};//

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при обновлении аватара'));
      } else {
        next(e);
      }
    });
};//

module.exports = {
  createUser, getUser, getUsers, getCurrentUser, updateUser, updateAvatar, login,
};
