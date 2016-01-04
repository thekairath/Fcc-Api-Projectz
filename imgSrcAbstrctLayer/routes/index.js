var express = require('express');
var router = express.Router();
var fs = require("fs");
require("dotenv").load();
var request = require("request");
var searchs = [];
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/api",function(req, res, next) {
  var query = req.query;
  var querySearch = "cat";
  var limit = 10;
  if(query.offset ){
      var number = parseInt(query.offset,10);
      number <= 10 ? limit = number : limit = 10;
      console.log(number);
  }
  if(query.q){ querySearch = query.q }
  var url = "https://www.googleapis.com/customsearch/v1?key=" + process.env.APIKEY +
    "&cx=" + process.env.APIID + "&q=" + querySearch + '&num=' + limit;
  var reqUrl = req.query;
  request(url, function (err, response, body) {
    if(!err && response.statusCode == 200){
        var x = [];
      console.log(JSON.parse(body).items);
      JSON.parse(body).items.forEach(function(item){
        var date = new Date();
        var title = item.title;
        var elem = { };
        elem.desc = item.snippet;
        elem.imgUrl = item.pagemap.cse_image[0].src;
        elem.link = item.link;
        if(searchs.length >=10){
          searchs.shift();
        }
        searchs.push({date: date, title: title});
        x.push(elem);
      });
        res.json(x);
    } else {
        res.send([]);
    }
  });
});

router.get("/recent", function(req, res, next) {
    res.send(searchs);
});

module.exports = router;
