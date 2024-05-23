const express = require('express');
const router = express.Router();
const data = require('../data/data.json');

router.get('/', (req, res) => {
    console.log(req.session.currentCategory)

    const categories = data.categories;
    req.session.viewCount = (req.session.viewCount || 0) + 2;
    req.session.currentCategory = req.session.currentCategory || 'Smart Home Devices';
    
    const currentCategoryProducts = data.categories.find(category => category.name === req.session.currentCategory).products;

    const cart = req.session.cart || [];

    // make products like currentcategoryproducts but with quantity
    const products = currentCategoryProducts.map(product => {
        const cartProduct = cart.find(cartProduct => cartProduct.name === product.name);
        if (cartProduct) {
            return {
                ...product,
                quantity: cartProduct.quantity,
            };
        }
        return {
            ...product,
            quantity: 0,
        };
    });

    let brojProizvodaUKosarici = 0
    try {
        brojProizvodaUKosarici = req.session.cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0);
    } catch (error) {
        console.log(error);
    }

    res.render('home', {
        categories,
        currentCategory: req.session.currentCategory,
        products,
        brojProizvodaUKosarici,
    });
});

router.post('/change-category', async (req, res) => {
    const newCategory = req.body.category;

    req.session.currentCategory = newCategory;
    console.log(data);

    const currentCategoryProducts = data.categories.find(category => category.name === req.session.currentCategory).products;

    const cart = req.session.cart || [];

    let brojProizvodaUKosarici = 0
    try {
        brojProizvodaUKosarici = req.session.cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0);
    } catch (error) {
        console.log(error);
    }

    res.send({
        message: 'Category changed successfully!',
        newCategory: newCategory,
        products: currentCategoryProducts,
        brojProizvodaUKosarici,
    });
});

router.get('/getCategories', (req, res) => {
    res.send(data.categories);
});

router.get('/getProducts/:id', (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const products = data.categories[id].products;
    res.send(products);
});

module.exports = router;