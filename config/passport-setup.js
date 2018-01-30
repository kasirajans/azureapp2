const passport = require('passport');
const AzureOIDCStrategy = require('passport-azure-ad').OIDCStrategy;
var keys = require('./keys');
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: "passport-setup.js" });

log.info('Setting up passport.js');



// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session.  Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
//-----------------------------------------------------------------------------
passport.serializeUser(function(user, done) {
    done(null, user.oid);
  });
  
  passport.deserializeUser(function(oid, done) {
    findByOid(oid, function (err, user) {
      done(err, user);
    });
  });
  
// array to hold logged in users
var users = [];
var access_Token;
var findByOid = function(oid, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
   log.info('we are using usera: ', user);
    if (user.oid === oid) {
        log.info('we are using oid usera :');
      return fn(null, user);
    }
  }
  log.info('we are using Null usera :');
  return fn(null, null);
};


passport.use(new AzureOIDCStrategy({
    //option for AzureAD
    identityMetadata: keys.azureAD.identityMetadata,
    clientID: keys.azureAD.clientID,
    tenantGUID: keys.azureAD.tenentID,
    responseType: 'code id_token',
    responseMode: 'form_post',
    // Required if we use http for redirectUrl
    allowHttpForRedirectUrl: true,
    redirectUrl: 'http://localhost:3000/auth/openid/return',
    clientSecret: keys.azureAD.clientSecret,
    passReqToCallback: 'false',
    // Optional, 'error', 'warn' or 'info'
    loggingLevel: 'info',
    session: 'false',
    resourceURL: 'https://graph.microsoft.com',
    validateIssuer: 'true',
    clockSkew: null,
    nonceMaxAmount: 5,
    nonceLifetime: null,
    scope: null,
    cookieEncryptionKeys: [
        { 'key': '12345678901234567890123456789012', 'iv': '123456789012' },
        { 'key': 'abcdefghijklmnopqrstuvwxyzabcdef', 'iv': 'abcdefghijkl' }
    ],
    useCookieInsteadOfSession: true,
    issuer: null,
    isB2C: false
}, (req, iss, sub, profile, access_token, refresh_token, done) => {
    //passport callback function
    log.info('passport call back function fired');

    console.log('access token is ++++' + access_token)
    console.log('profile' + JSON.stringify(profile));
    // return done(null, profile);
//res.send('Reached call back fun');

if (!profile.oid) {
    return done(new Error("No oid found"), null);
  }
  // asynchronous verification, for effect...
  process.nextTick(function () {
    findByOid(profile.oid, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        // "Auto-registration"
        users.push(profile);

        log.info('usera Profile is not exists: '+user);
//console.log("access token is "+accessToken);
        //check

        

       
        return done(null, profile);
        
      }
      log.info('usera Profile is exists');
      return done(null, user);
    });
  });

})
)