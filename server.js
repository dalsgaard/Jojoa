var express = require('express');

var app = express.createServer();

app.configure(function() {
  app.use(express.favicon());
  app.use(express.static(__dirname + '/static'));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.set('view engine', 'jade');

app.set('view options', {
  layout: false
});

app.post("/form", express.bodyParser(), function(req, res) {
  console.log(req.body);
  res.send(201);
});

app.get("/time", function(req, res) {
  //res.header('Access-Control-Allow-Origin', "*");
  res.send(new Date());
});

app.get("/index", function(req, res) {
  res.render("index");
});

app.get("/cache", function(req, res) {
  res.render("cache");
});

var port = process.argv[2] || 8340;

app.listen(port);
console.log("Server running at port " + port);