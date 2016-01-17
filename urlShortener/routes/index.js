var express = require('express');
var router = express.Router();
var fs = require("fs");
var urls = [];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/:url(*)",function(req, res, next) {
  var reqUrl = req.params.url
  
  console.log(reqUrl.match(regex));
  var regex = /^(http:\/\/|https:\/\/)?((w){3})?\.?(\w)+\.(com){1}\/*\w*/i;
  if(urls[reqUrl]){
    if(!!urls[reqUrl]){
      res.redirect(urls[reqUrl]);
    }  
  }
  else if(reqUrl.match(regex)){
    if(urls[reqUrl]){
      res.redirect(urls[reqUrl]);
    } else if( urls.indexOf(reqUrl) != -1){
      var ind = urls.indexOf(reqUrl);
       res.json({ "original_url": reqUrl, "short_url": "https://mighty-springs-1900.herokuapp.com/" + ind });
    } else {
      urls.push(reqUrl);
      res.json({ "original_url": reqUrl, "short_url": "https://mighty-springs-1900.herokuapp.com/" + urls.indexOf(reqUrl) });
    }
  } else {
    res.send("invalid adress");
  }
});

module.exports = router;
