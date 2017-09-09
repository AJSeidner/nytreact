
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');


var Article = require("./models/Article.js");


var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("./public"));


//creates pathway to create and modify DB
mongoose.connect('mongodb://localhost/nytreact');


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
  //var newArticle = new Article(req.body);

  //var title = req.body.title;
  //var date = req.body.date;
  //var url = req.body.url;

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