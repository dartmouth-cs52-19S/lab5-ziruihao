import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user-model';


dotenv.config({ silent: true });

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  } else if (User.find({ email }) !== null) {
    return res.status(409).send('Email already taken.');
  } else {
    const user = new User();
    user.email = email;
    user.password = password;
    user.save().then(() => {
      res.send({ token: tokenForUser(req.user) });
    }).catch((error) => {
      res.send(error);
    });
  }
};
