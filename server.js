var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var questions = require('./questions');
var fs = require('fs');
var m = require('./match');

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routes
app.get("/", function(req, res) {
    res.render("index", {});
});

app.get("/survey", function(req, res) {
    res.render("survey", { questions: questions.questions });
});

app.get("/api/friends", function(req, res) {
    fs.readFile('users.json', 'utf-8', function(err, data) {
        res.json(JSON.parse(data));
    });

});

app.post("/survey", function(req, res) {
    console.log("got POST");
    console.log(req.body);
    var users = [];
    fs.readFile('users.json', 'utf-8', function(err, users) {
        this.users = users;
        res.json(m.match(users, req.body));
    });
});

app.listen(PORT, function(err) {
    console.log("app listening on " + PORT);
});