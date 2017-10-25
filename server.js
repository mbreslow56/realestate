
var express     = require('express');
var mongoose    = require('mongoose');
//var expressSession = require('express-session');
var bodyParser  = require('body-parser');
//var LocalStrategy = require('passport-local').Strategy;
var router      = express.Router();

mongoose.connect(process.env.CONNECTION_STRING||"mongodb://localhost/realestate");

var app         = express();
var port        = process.env.PORT || '8000';

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
  // res.send("GOD DAMN!!!!!!!!!!!!!");
});

//main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(port, function() {
  console.log("Let's sell some real estate sites " + port);
});