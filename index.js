import exphbs from 'express-handlebars';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import noteRoutes from './routes/note-routes.js';
import {helpers} from './utils/handlebar-util.js'
import {overrideMiddleware} from "./utils/method-override.js";

const app = express();

const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: "default",
    helpers: {
        ...helpers
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(overrideMiddleware);
app.use(express.static(path.resolve('source/public')));

app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));

app.use((req, res, next) => {
    next();
});

app.use(noteRoutes);

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname);
