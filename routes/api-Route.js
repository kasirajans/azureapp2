const router = require('express').Router();
const passport = require('passport');
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: "apiRoutes.js" });

router.get('/testAPI',(req,res)=>{
    log.info('Testing api call')
res.send('Api call working');


});


router.get('/api/me',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  });

module.exports = router;