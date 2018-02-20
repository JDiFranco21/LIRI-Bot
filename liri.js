require("dotenv").config();

var keys = require("./keys.js");

var client = new Twitter({
  consumer_key: 'Go8zXWGyqbTA8qvoHrqzZxJP3',
  consumer_secret: '',
  bearer_token: ''
});

client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);  // The favorites.
  console.log(response);  // Raw response object.
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



