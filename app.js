const express = require('express');
const app = express();
const hbs = require('hbs');
const authRoutes = require('./routes/auth-routes');
const apiRoute = require('./routes/api-Route');
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: "app.js" });
const passportSetup=require('./config/passport-setup');
const passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
var expressSession = require('express-session');
const port= process.env.PORT ||3000; 


app.use(bodyParser.urlencoded({ extended: true }));
const mongoose=require('mongoose');
const keys=require('./config/keys');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//app.set('views', __dirname + '/views');

log.info('Starting app')

// For the routes you want to check if user is already logged in, use 
// `ensureAuthenticated`. It checks if there is an user stored in session, if not
// it will call `passport.authenticate` to ask for user to log in.
//-----------------------------------------------------------------------------
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login');
};


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


app.use(cookieParser());

//setup routes

app.use('/auth', authRoutes);

app.use('/api',apiRoute);


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});


app.get('/', (req, res) => {
    log.info('Home page')
    res.render('home.hbs', {
        pageTitle: 'Home'

    });
});


// check user logged in 

app.get('/profile',ensureAuthenticated, (req, res) => {
    log.info('Profile page')
    console.log("accesstoke is "+req.access_token)
    res.render('profile.hbs', {
        user:req.user
    });
});

app.listen(port, () => console.log('Azure AD portal app listerning in '+port));
//module.export=hbs;

