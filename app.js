import express from 'express';
import connectdatabase from './config/db.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import urlroutes from './routes/userRoutes.js';
import userRoutes from './routes/allRoutes.js';
// import { CheckAuthentication, RestrictUserOnlyTO } from './middleware/userMiddleware.js';

const app = express();
const port = 8006;

// connect the server
connectdatabase();

// middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(CheckAuthentication);

// set data
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Routes
app.use('/url', urlroutes);
app.use('/user', userRoutes);
app.use('/', urlroutes); // StaticRoutes(homepage)

// server start
app.listen(port, () => console.log(`Server Started : ${port} 🎉`));
