const router = require('express').Router();
//const hbs=require('../app');
const passport = require('passport');
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: "auth-routes.js" });
// router.get('/login', (req, res) => {
//     log.info('login page');
//     res.render('login.hbs', {
//         pageTitle: 'Login'

//     });
// });

//authwith azuread
// log.info('Loading router ');
// router.get('/login',
//     passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
//     function (req, res) {
//         log.info('Login was called');
//         res.redirect('/');

//     });

router.get('/login', passport.authenticate('azuread-openidconnect')
);


//Get the Authcode and  resend the authcode to get access token
router.post('/openid/return', passport.authenticate('azuread-openidconnect'), (req, res) => {
    log.info('Redirecting to  profile page');
  
  
    res.redirect('/profile');
});

  
router.get('/openid/return',  (req, res) => {
    log.info('Returned AuthCode response');
    res.send('got call back' +req.user);
});

//logout
router.get('/logout', (req, res) => {
    log.info('Logging out page');
    res.render('logout.hbs', {
        pageTitle: 'Logout'

    });
});

module.exports = router;