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


