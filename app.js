const express = require('express');
const app = express();
const hbs = require('hbs');
const authRoutes = require('./routes/auth-routes');
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: "app.js" });
const passportSetup=require('./config/passport-setup');
const passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
var expressSession = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
const mongoose=require('mongoose');
const keys=require('./config/keys');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//app.set('views', __dirname + '/views');

log.info('Starting app')


//Connect DB or express session 
if(keys.mongodb.dbEnabled){
mongoose.connect(keys.mongodb.dbURI,()=>{

    log.info('Connected to mongo DB');
    console.log('Connected to Mongo DB')
});

}else {
    app.use(expressSession({ secret: keys.session.cookiekey, resave: true, saveUninitialized: false }));
  }
  
  //Initialize passport 

  app.use(passport.initialize());
  app.use(passport.session());

//Is 
//setup routes

app.use(cookieParser());
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

