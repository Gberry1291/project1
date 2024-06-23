// import express from 'express';

// const app = express();
// const port = 3000;

// app.use(express.static('source/public'));

// app.listen(port, () => {
//     // eslint-disable-next-line no-console
//     console.log(`Example app listening at http://localhost:${port}`);
// });

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import {noteRoutes} from './routes/note-routes.js';
import {helpers} from './utils/handlebar-util.js'
import {overrideMiddleware} from "./utils/method-override.js";
import dotenv from "dotenv";

// 1. import express-handlebars
import exphbs from 'express-handlebars';


const app = express();

// 2. configure
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: "default",
    helpers: {
        ...helpers
    }
});

// 3. set engine and global values
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(overrideMiddleware);
app.use(express.static(path.resolve('source/public')));

app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));
dotenv.config({ path: `.env${process.env.NODE_ENV ? `-${process.env.NODE_ENV}` : ''}`});

app.use((req, res, next) => {
    next();
});

app.use(noteRoutes);

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
