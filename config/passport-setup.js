const passport = require('passport');
const AzureOIDCStrategy = require('passport-azure-ad').OIDCStrategy;
var keys = require('./keys');
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: "passport-setup.js" });

log.info('Setting up passport.js');
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
    passReqToCallback:'false',
     // Optional, 'error', 'warn' or 'info'
    loggingLevel:'info',
    session:'false',
    resourceURL:'https://graph.microsoft.com',
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

   console.log('access token is ++++'+access_token)
})
)