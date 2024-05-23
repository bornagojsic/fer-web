const express = require('express');
const router = express.Router();
const data = require('../data/data.json');

router.get('/', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    let brojProizvodaUKosarici = 0
    try {
        brojProizvodaUKosarici = req.session.cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0);
    } catch (error) {
        console.log(error);
    }

    res.render('cart', {
        cart: req.session.cart,
        currentCategory: '',
        brojProizvodaUKosarici,
    });
});

router.post('/add', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    const productName = req.body.productName;

    if (req.session.cart.find(product => product.name === productName)) {
        req.session.cart.find(product => product.name === productName).quantity++;
    } else {
        req.session.cart.push({
            name: productName,
            quantity: 1
        });
    }

    res.send({
        message: 'Product added to cart successfully!',
        cart: req.session.cart
    });
});

router.post('/remove', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    const productName = req.body.productName;
    
    if (!req.session.cart.find(product => product.name === productName)) {
        res.send({
            message: 'Product not found in cart!',
            cart: req.session.cart
        });
        return;
    }

    req.session.cart.find(product => product.name === productName).quantity--;

    if (req.session.cart.find(product => product.name === productName).quantity === 0) {
        req.session.cart = req.session.cart.filter(product => product.name !== productName);
    }

    res.send({
        message: 'Product removed from cart successfully!',
        cart: req.session.cart,
        brojProizvodaUKosarici: req.session.cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0)
    });
});

router.get('/getAll', (req, res) => {
    res.send(req.session.cart);
});

/* product ID is the index in data.json */

router.get('/add/:id', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    const productId = req.params.id;
    const products = data.categories.flatMap(category => category.products);
    const product = products[productId];

    if (req.session.cart.find(cartProduct => cartProduct.name === product.name)) {
        req.session.cart.find(cartProduct => cartProduct.name === product.name).quantity++;
    } else {
        req.session.cart.push({
            name: product.name,
            quantity: 1
        });
    }

    res.send({
        message: 'Product added to cart successfully!',
        cart: req.session.cart
    });
});

router.get('/remove/:id', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    const productId = req.params.id;
    const products = data.categories.flatMap(category => category.products);
    const product = products[productId];

    if (!req.session.cart.find(cartProduct => cartProduct.name === product.name)) {
        res.send({
            message: 'Product not found in cart!',
            cart: req.session.cart
        });
        return;
    }

    req.session.cart.find(cartProduct => cartProduct.name === product.name).quantity--;

    if (req.session.cart.find(cartProduct => cartProduct.name === product.name).quantity === 0) {
        req.session.cart = req.session.cart.filter(cartProduct => cartProduct.name !== product.name);
    }

    res.send({
        message: 'Product removed from cart successfully!',
        cart: req.session.cart,
        brojProizvodaUKosarici: req.session.cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0)
    });
});

module.exports = router;