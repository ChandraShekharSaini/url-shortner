import mongoose from 'mongoose';
import user from '../models/user.js';
import URL from '../models/userSchema.js';
import { v4 as uuidv4 } from 'uuid';
import { setUser } from '../Services/auth.js';

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await user.create({
      name,
      email,
      password,
    });

    if (!newUser) {
      return res
        .status(404)
        .json({ status: 'pending', message: 'newUser not created' });
    }

    res.render('login');
  } catch (err) {
    console.log('Error for duplicate value');
    return res
      .status(404)
      .json({ status: 'pending', message: 'duplicate value is taken' });
  }
};

const signpage = (req, res) => {
  res.render('signup');
};

const loginpage = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await user.findOne({ email, password });

  if (!isUser) {
    return res.redirect('/user/login');
  }

  const alldata = await URL.find({});

  res.render('home', {
    urls: alldata,
  });
};

const loginnewpage = (req, res) => {
  res.render('login');
};

const admin = async (req, res) => {
  const allurls = await URL.find({});

  return res.render('home', {
    urls: allurls,
  });
};

export { signup, signpage, loginpage, loginnewpage, admin };
