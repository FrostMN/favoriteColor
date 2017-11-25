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

/* GET secret page*/
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

router.post('/saveSecrets', isLoggedIn, function (req, res, next) {
    if( req.body.color || req.body.luckyNumber ) {
        // add to the req.user.favs object
        req.user.favorites.color = req.body.color || req.user.favorites.color;
        req.user.favorites.luckyNumber = req.body.luckyNumber || req.user.favorites.luckyNumber;

        //save modified user
        req.user.save()
            .then( () => {
                req.flash('updateMsg', 'Your data was updates');
                res.redirect('/secrets');
            })
            .catch( (err) => {
                if(err.name == 'ValidationError') {
                    req.flash('updateMsg', 'Your data was not valid');
                    res.redirect('/secrets')
                } else {
                    next(err);
                }
            });
    } else {
        req.flash('updateMsg', 'please enter data')
        res.redirect('/secrets');
    }
});


module.exports = router;
