var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/:timestamp", function(req, res, next) {
   var timestamp = req.params.timestamp;
   var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   var responseData = { "unix": null, "natural": null };
   function formatTime(x){
     var date;
     if(isNaN(timestamp)){
       date = new Date(timestamp);
     } else {
       date = new Date(parseInt(timestamp,10)*1000);
     }
    if(date.getFullYear()>0){
      responseData = { "unix": date.getTime()/1000, "natural": date.getDay() +" " +mL[date.getMonth()]+ "," + date.getFullYear() };
    } 
   }
   formatTime(timestamp);
   console.log(timestamp);
   res.send(responseData);
});

module.exports = router;
