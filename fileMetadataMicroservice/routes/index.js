var express = require('express');
var router = express.Router();
var fs = require("fs");
var multer = require("multer");
var upload = multer({ dest: 'uploads/' });


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/upload", upload.single('file'),function(req, res, next) {
  res.json("size of the file: "+req.file.size);
});

module.exports = router;
