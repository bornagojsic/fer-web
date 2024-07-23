const express = require('express');
const router = express.Router();

const movieListWrapper = (req, func) => {
    if (!req.session.movieList) {
        req.session.movieList = [];
    }

    func();
};

router.get('/', (req, res) => {
    movieListWrapper(req, () => res.render('movieList', { movieList: req.session.movieList }));
});

router.get('/add', (req, res) => {
    movieListWrapper(req, () => res.render('addMovie'));
});

router.post('/add', (req, res) => {
    movieListWrapper(req, () => {
        req.session.movieList.push({
            name: req.body.name,
            director: req.body.director
        });
    
        res.redirect('/movies');
    });
});

router.get('/delete/:id', (req, res) => {
    movieListWrapper(req, () => {
        req.session.movieList.splice(req.params.id, 1);

        res.redirect('/movies');
    });
});

module.exports = router;