var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
    res.redirect("/whoami");
});

router.get("/whoami", function(req, res, next) {
   console.log(req.headers);
   var lang = req.headers['accept-language'].split(",")[0];
   var ip = req.headers['x-forwarded-for'];
   var start = req.headers['user-agent'].indexOf("(");
   var end = req.headers['user-agent'].indexOf(")");
   var opsys = req.headers['user-agent'].substr(start, end);
   var reend = opsys.indexOf(")");
   console.log(opsys);
   res.send({ language: lang , ip: ip , "opeartion system": opsys.substr(1,reend-1)});
});

module.exports = router;
