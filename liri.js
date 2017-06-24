///////////////////////////////////////
///////////// VARIABLES ///////////////
///////////////////////////////////////

// console logs file initialization
console.log('loading liri.js');

// requires the keys.js file
var keys = require('./keys.js');

// packages
const fs = require('fs');
const omdb = require('omdbapi');
var Twitter = require('twitter');

const spotify = require('node-spotify-api');
const request = require('request');


// Spotify
var spotifyKeys = keys.spotifyKeys;
var spotifyAccess = new spotify(spotifyKeys);

// user inputs command to perform a desired action
var command = process.argv[2];
var inputQuery = process.argv[3];


///////////////////////////////////////
///////////// OPERATORS ///////////////
///////////////////////////////////////


switch (command) {
	case 'my-tweets':
		console.log('TWEETS');
		console.log('__________________________________');
		console.log('__________________________________');
		twitterAction();
	break;

	case 'spotify-this-song':
		console.log('SPOTIFY');
		console.log('__________________________________');
		console.log('__________________________________');
		spotifyAction();
	break;

	case 'movie-this':
		console.log('MOVIE');
		console.log('__________________________________');
		console.log('__________________________________');
		movieAction();
	break;

	case 'do-what-it-says':
		// console.log('DO WHAT IT SAYS');
		// console.log('__________________________________');
		// console.log('__________________________________');
		doAction();
	break;

	case 'default':
		console.log('default');
};

///////////////////////////////////////
///////////// FUNCTIONS ///////////////
///////////////////////////////////////



// performs twitter search
function twitterAction(command) {

	// creates new twitter object, passing in auth keys from keys.js
	var client = new Twitter(keys.twitterKeys);

	// creates search query
	var params = {screen_name: 'nvTweetsJS'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			// console.log(tweets);
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at);
				console.log(' ');
				console.log(tweets[i].text);
			}
		} else {
			console.log("Twitter didnt' recognize that command. Error code: " + error);
		}
	});
};

// grabs artist names. (not quite sure how this works, I took it from the video lesson);
var getArtistNames = function(artist) {
	return artist.name;
}

// performs spotify search
function spotifyAction(command) {
	 
	var spotifyQuery = new spotify({
	  id: '416e15d0a9c74b8088ff7c34a0029097',
	  secret: '16fa8954ec104e69b80bdde209936695'
	});
	 
	spotifyQuery.search({ type: 'track', query: inputQuery }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  } 
	 
	 // creates shortcut for each song path
	 var songs = data.tracks.items;

	 // loops though each song to pull the following attributes
	 for (var i = 0; i < songs.length; i++) {
	 	console.log(i);
	 	console.log(`Artist(s): ${songs[i].artists.map(getArtistNames)}`);
	 	console.log(`Song Name: ${songs[i].name}`);
	 	console.log(`Album: ${songs[i].album.name}`);
	 	console.log(`Preview this song: ${songs[i].preview_url}`);
	 	console.log(' ');
	 	console.log('__________________________________');
	 };
	
	// console.log(JSON.stringify(data, null, 2)); 

	});
};

// performs omdb search
function movieAction() {

	// call to omdb server using "request" package
	var apiKey = '40e9cece';
	var movieSearch = request(("http://www.omdbapi.com/?t=" + inputQuery + "&y=&plot=short&r=json&apikey=" + apiKey), function (err, response, body) {
		
		// check for errors
		if (err) throw err;

		// console.log(JSON.stringify(response, null, 2));

		// grabs json response and stores in a variable
		var jsonData = JSON.parse(body);

		// logs out movie info
		console.log(' ');
		console.log(`Movie Title: ${jsonData.Title}`);
		console.log(`Year: ${jsonData.Year}`);
		console.log(`Rating: ${jsonData.Rated}`);
		console.log(`Runtime: ${jsonData.Runtime}`)
		console.log(`Director: ${jsonData.Director}`)
		console.log(`Actors: ${jsonData.Actors}`)
		console.log(`Plot: ${jsonData.Plot}`);
		console.log(`IMDB Rating: ${jsonData.imdbRating}`);
		console.log(' ');
	 	console.log('__________________________________');

	});
};


// performs do-what-it-says action
// pulls data from random.txt
function doAction() {
	console.log('DO WHAT IT SAYS');
	console.log('__________________________________');
	console.log('__________________________________');

	fs.readFile('random.txt', 'utf8', function(error, data) {
		if (error) throw error;
		console.log(data);
	});
};

