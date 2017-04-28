var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var questions = require('./questions');

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

});

app.listen(PORT, function(err) {
    console.log("app listening on " + PORT);
});