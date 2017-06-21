///////////////////////////////////////
///////////// VARIABLES ///////////////
///////////////////////////////////////

// console logs file initialization
console.log('loading liri.js');

// packages
const fs = require('fs');
const omdb = require('omdbapi');
const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');

// requires the keys.js file
var keys = require('./keys.js');

// // OMDB
// var omdbKeys = keys.omdbKeys;
// var omdbAccess = new omdb(omdbKeys);

// Twitter 
var twitterAuth = keys.twitterKeys;

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
	var auth = new twitter(twitterAuth);

	// creates search query
	var params = {screen_name: 'nvTweetsJS'};
	auth.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	    console.log(JSON.stringify(response, null, 2));
	  } else {
	  	console.log('There was an error');
	  }
	});
};

// performs spotify search
function spotifyAction(command, inputQuery) {
	 
	var spotifyQuery = new spotify({
	  id: '416e15d0a9c74b8088ff7c34a0029097',
	  secret: '16fa8954ec104e69b80bdde209936695'
	});
	 
	spotifyQuery.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	console.log(JSON.stringify(data, null, 2)); 

	// fs.writeFile('json.txt', )
	});
};

// performs omdb search
function movieAction() {

	var movieSearch = request(("http://www.omdbapi.com/?t=" + inputQuery + "&y=&plot=short&r=json&apikey=40e9cece"), function (err, response, body) {
		if (err) throw err;
		console.log(JSON.stringify(response, null, 2));
		var body = response.body;
		console.log(`MOVIE TITLE: ${body.title}`);
	});
};



// performs specified action
function doAction() {
	console.log('DO WHAT IT SAYS');
	console.log('__________________________________');
	console.log('__________________________________');
};

