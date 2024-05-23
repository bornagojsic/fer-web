const express = require('express');
const session = require('express-session');
const path = require('path');


const app = express();


app.use(session({
    secret: 'your_secret_key', // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day cookie expiry
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', express.static(path.join(__dirname, 'public')));


const homeRouter = require('./routes/home.routes');
const cartRouter = require('./routes/cart.routes');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', homeRouter);
app.use('/cart', cartRouter);


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});