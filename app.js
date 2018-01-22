const express = require('express');
const app = express();
const hbs = require('hbs');
const authRoutes = require('./routes/auth-routes');
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: "app.js" });
const passportSetup=require('./config/passport-setup');


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//app.set('views', __dirname + '/views');

log.info('Starting app')
//setup routes

app.use('/auth', authRoutes);
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});


app.get('/', (req, res) => {
    log.info('Home page')
    res.render('home.hbs', {
        pageTitle: 'Home'

    });
});


app.get('/profile', (req, res) => {
    log.info('Profile page')
    res.render('profile.hbs', {
        pageTitle: 'Profile'
    });
});

app.listen(3000, () => console.log('Azure AD portal app listerning in 3000!'));
//module.export=hbs;

