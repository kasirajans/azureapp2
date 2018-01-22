# azureapp2

// Add this file to .gitignore

var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "keys.js"});

log.info('Exporting Azure config ClientID,clientSecret and tenentID')
module.exports = {
    azureAD: {
        identityMetadata:'<OpenID metadata>',
        clientID: '<ClientID>',
        clientSecret: '<ClientSecret>',
        tenentID: '<Tenant ID>'
    },
};
