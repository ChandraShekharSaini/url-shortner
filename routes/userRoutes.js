import express from 'express';
import {
  ShortURL,
  redirecturl,
  Analytics,
  Render,
} from '../controllers/userControllers.js';

import { signpage, admin } from '../controllers/alluser.js';

const router = express.Router();

router.post('/', ShortURL);
router.get('/signup', signpage);
router.get('/:sid', redirecturl);
router.get('/visit/:sid', Analytics);
router.get('/admin/url', admin);
router.get('/', Render); // Static login (homepage)

export default router;
