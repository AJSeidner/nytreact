//here are requirements
var express = require('express');
//this is probably not needed
var expressHandlebars = require('express-handlebars');
//this is probably not needed
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
//we need our mongoose Article file to send info to the mongoDB
var Article = require("./models/Article.js");
//oh hai express
var app = express();
var PORT = process.env.PORT || 3000;
//we probably don't need body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
//for allowing us to serve files in that are static in public dir
app.use(express.static("./public"));


//creates pathway to create and modify DB
mongoose.connect('mongodb://localhost/nytreact');
//for making language easier below
var db = mongoose.connection;
//to check if connection is successful
db.on('error', function (err){
	console.log('Mongoose Error: ', err);
});

db.once('open', function () {
	console.log("Mongoose connection Successful!");
})

//get route for homepage
app.get('/', function(req,res){
	res.sendFile('./public/index.html');
})

//get route for saved articles
app.get('/api/saved', function(req, res){

	Article.find({}).exec(function(err,doc){
		if(err){
			console.log(err);
		}
		else{
			res.send(doc);
		}
		})
	});
//function for posting saved articles
app.post('/api/saved', function(req, res){


//This is where data is sent to Mongo DB
//Article is equivalent to Table
  Article.create({
    
    title: req.body.title,
    date: req.body.date,
    url: req.body.url,
   
  },function (err){
    if(err){
      console.log(err);
    } else {
      res.send("Saved Article");
    }
  });
});

app.delete('/api/saved/', function(req, res){

  var url = req.param('url');

  Article.find({"url": url}).remove().exec(function(err, data){
    if(err){
      console.log(err);
    }
    else {
      res.send("Deleted");
    }
  });
});


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});