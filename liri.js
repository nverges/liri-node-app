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

// requires the keys.js file
var keys = require('./keys');

// // OMDB
// var omdbKeys = keys.omdbKeys;
// var omdbAccess = new omdb(omdbKeys);

// API key values pulled from keys.js
var twitterKeys = keys.twitterKeys;
var twitterAccess = new twitter(twitterKeys);

// Spotify
var spotifyKeys = keys.spotifyKeys;
var spotifyAccess = new spotify(spotifyKeys);

// user inputs command to perform a desired action
var command = process.argv[2];
var query = process.argv[3];



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
function twitterAction() {
	var params = {screen_name: 'nvTweetsJS'};
	twitterAccess.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log(params);
	    console.log(tweets);
	    console.log(JSON.stringify(response, null, 2));
	  }
	});
};

// performs spotify search
function spotifyAction() {
	spotifyAccess
	  .search({ type: 'track', query: 'All the Small Things' })
	  .then(function(response) {
	    console.log(response);
	  })
	  .catch(function(err) {
	    console.log(error);
	  });
};

// performs omdb search
function movieAction() {
		omdb.search({
	    search: 'game of thrones',  // required 
	    type: 'series',             // optionnal  ['series', 'episode', 'movie'] 
	    year: '2011',               // optionnal 
	    page: '1'                   // optionnal (1 to 100) 
	}).then(res => {
	    console.log('got response:', JSON.stringify(res, null, 2));
	}).catch(console.error);
	 
	omdb.get({
	    id: '40e9cece',            // optionnal (requires imdbid or title) 
	    title: 'Game of Thrones',   // optionnal (requires imdbid or title) 
	    season: 1,                  // optionnal 
	    episode: 1,                 // optionnal 
	    type: 'series',             // optionnal ['series', 'episode', 'movie'] 
	    plot: 'full',               // optionnal (defaults to 'short') 
	    tomatoes: true,             // optionnal (get rotten tomatoes ratings) 
	    year: '2011'                // optionnal 
	}).then(res => {
	    console.log('got response:', JSON.stringify(res, null, 2));
	}).catch(console.error);

};

// performs specified action
function doAction() {
	console.log('DO WHAT IT SAYS');
	console.log('__________________________________');
	console.log('__________________________________');
};

