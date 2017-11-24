var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/secrets');
});

/* GET Login page. */
router.get('/login', function(req, res, next) {
    res.render('login');
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
    res.render('signup');
});


/* POST to login page. */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/secrets',
    failureRedirect: '/login',
    failureFlash: true
}));

/* POST to signup page. */
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/secrets',
    failureRedirect: '/signup',
    failureFlash: true
}));

/* DET secret page*/
router.get('/secrets', isLoggedIn, function (req, res, next) {
    var user = req.user.local;

    res.render('secrets', {
        username: user.username
    });
});

/* Middle ware to determine logged in*/
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login')
    }
}

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
