import express from 'express';
import {
  signup,
  signpage,
  loginpage,
  loginnewpage,
} from '../controllers/alluser.js';

const router = express.Router();

router.post('/login', signup);
router.get('/signup', signpage);
router.get('/login', loginnewpage);
router.post('/login/home', loginpage);

export default router;
