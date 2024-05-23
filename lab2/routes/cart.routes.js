const express = require('express');
const router = express.Router();

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

    console.log(brojProizvodaUKosarici)
    console.log(req.session.cart.length)

    res.render('cart', {
        cart: req.session.cart,
        currentCategory: '',
        brojProizvodaUKosarici,
    });
});

router.post('/add', (req, res) => {
    console.log(req.body);
    console.log("\n\n")

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

    console.log("session.cart: ", req.session.cart);

    res.send({
        message: 'Product added to cart successfully!',
        cart: req.session.cart
    });
});

router.post('/remove', (req, res) => {
    console.log(req.body);
    console.log("\n\n")

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


// TODO: add /add/:id and /remove/:id routes

module.exports = router;