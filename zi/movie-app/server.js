const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const homeRouter = require('./routes/home.routes');
const movieRouter = require('./routes/movie.routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/movies', movieRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})