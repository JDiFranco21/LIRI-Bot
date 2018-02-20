require("dotenv").config();

var keys = require("./keys.js");

var client = new Twitter({
  consumer_key: 'Go8zXWGyqbTA8qvoHrqzZxJP3',
  consumer_secret: '',
  bearer_token: ''
});

client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);
  console.log(response);
});

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

var nodeArgs = process.argv;


var value = "";


for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        value = value + "+" + nodeArgs[i];

    } else {

        value = value + nodeArgs[i];
    }
}

switch (action) {
    case 'my-tweets':
        twitter();
        break;

    case 'spotify-this-song':
        spotify();
        break;

    case 'movie-this':
        imdb();
        break;

    case 'do-what-it-says':
        dwis();
        break;
}


function twitter() {
    var fs = require('fs');

    var twitterKey = require('./keys.js');

    var Twitter = require('twitter');

    var client = new Twitter(twitterKey.twitterKeys);

    var params = { screen_name: value, count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            console.log("===");
            console.log("Here are the most recent tweets");

            for (var i = 0; i < tweets.length; i++) {

                console.log("___");
                console.log("Tweeted on: " + tweets[i].created_at);
                console.log(tweets[i].text);

            }
        }
    });
}


function spotify() {

    if (value != false) {
        var spotify = require('spotify');

        spotify.search({
            type: 'track',
            query: value + '&limit=1&'
        }, function(error, data) {
            if (error) {
                console.log('Error occurred: ' + error);
                return;
            }
            console.log("---------------------------------------------------");
            console.log(" ");
            console.log("The song you entered " + value + ".");
            console.log(" ");
            console.log("Here is the song stats");
            console.log(" ");
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log(" ");
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log(" ");
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log(" ");
            console.log("---------------------------------------------------");
        });
    } else {
        {
            var spotify = require('spotify');

            spotify.search({
                type: 'track',
                query: 'led+zepplin+black+dog' + '&limit=1&'
            }, function(error, data) {
                if (error) {
                    console.log('Error occurred: ' + error);
                    return;
                }
                console.log("---------------------------------------------------");
                console.log(" ");
                console.log("You didn't enter anything, try this: ");
                console.log(" ");
                console.log("Track Title: " + data.tracks.items[0].name);
                console.log(" ");
                console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
                console.log(" ");
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log(" ");
                console.log("---------------------------------------------------");
            });
        }

    }
}


unction omdbData(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

      //adds text to log.txt
      fs.appendFile('log.txt', "Title: " + body.Title);
      fs.appendFile('log.txt', "Release Year: " + body.Year);
      fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
      fs.appendFile('log.txt', "Country: " + body.Country);
      fs.appendFile('log.txt', "Language: " + body.Language);
      fs.appendFile('log.txt', "Plot: " + body.Plot);
      fs.appendFile('log.txt', "Actors: " + body.Actors);
      fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
      fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);

    } else{
      console.log('Error occurred.')
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

      //adds text to log.txt
      fs.appendFile('log.txt', "-----------------------");
      fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      fs.appendFile('log.txt', "It's on Netflix!");
    }
  });

}
