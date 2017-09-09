//the helper.js file allows us to put are API call functions in a spot that doesn't crowd up our other JS files.
//we use axios to make the call to the API
var axios = require('axios');
//this is an old API key from class that still works
var APIKey = 'ded9a1904b324433b566774d22c41951';

//below are functions referenced throughout other Components or our React app, we simply call these functions by requiring helpers in the file
var helpers = {

  runQuery: function(term, start, end)  {
    //making those search terms more readible
    var term = term.trim();
    var start = start.trim() + "0101";
    var end = end.trim() + "1231";
    //the glorious API call using those trimmed up paramters
    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
          'api-key': APIKey,
          'q': term,
          'begin_date': start,
          'end_date': end
      }
    })
    //all apart of making a call (avoiding asynch issues)
    .then(function(results){

      return results.data.response;

    });
  },
  //with Jesus, hahahah, jk, this is our function for returning our API info
  getSaved: function(){

    return axios.get('/api/saved')
      .then(function(results){

        return results;
      })
  },
  //there's a joke here about nails and crosses, but serious important stuff here, this corrected a redundancy in our server, this is making our object that goes into Mongo DB
  postSaved: function(title, date, url){

    var newArticle = {title: title, date: date, url: url};
    return axios.post('/api/saved', newArticle)
      .then(function(results){
        return results._id;
      })

  },

  deleteSaved: function(title, data, url){

    return axios.delete('/api/saved', {
      params: {
          'title': title,
          'data': data,
          'url': url,
      }
    })
    .then(function(results){
      return results;
    })
  }

}

module.exports = helpers;