/* eslint-disable no-unused-vars */
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user-model';


dotenv.config({ silent: true });

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  // what is next for?
  User.findOne({ email: req.body.email }).then((result) => {
    const token = tokenForUser(req.user);
    res.send({
      user: result,
      token,
    });
  });
};

export const signup = (req, res, next) => {
  // what is next for?
  const { email } = req.body;
  const { password } = req.body;
  if (!email || !password) {
    res.status(422).send('You must provide email and password');
  } else {
    User.find({ email }).then((result) => {
      if (result.length !== 0) {
        res.status(409).send('Email already taken.');
      } else {
        const user = new User();
        user.email = email;
        user.password = password;
        user.name = req.body.name;
        user.initials = req.body.initials;
        user.imageURL = req.body.imageURL;
        user.save().then((result2) => {
          res.send({
            user: result2,
            token: tokenForUser(user),
          });
        }).catch((error) => {
          res.send(error);
        });
      }
    });
  }
};
