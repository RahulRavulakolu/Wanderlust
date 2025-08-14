const express = require('express');
const router = express.Router();

const WrapAsync = require('../utils/WrapAsync');
const passport = require('passport');
const { savedRedirectUrl } = require('../middleware.js');
const usercontrollers = require('../controllers/usercontroller.js')

// signup form and signup

router.route('/signup')
    .get(usercontrollers.singupForm)
    .post( WrapAsync(usercontrollers.singUp));


//login form and login
router.route('/login')
    .get( usercontrollers.loginForm)
    .post(
        savedRedirectUrl,       /// this middleware saves the redirect URL
        passport.authenticate('local',{   //this function wheather the user has entered crct details or not
        failureRedirect: '/login',
        failureFlash:true }),
        usercontrollers.login
    );

router.get('/logout', usercontrollers.logOut);
module.exports = router;