//////////// TO DO ////////////
// set default movie to 'Mr. Nobody' in movie-this
// set default song to 'Ace of Base' in spotify-this-song

// How can I push the command from random.txt to my first switch statement, 
// instead of creating another one within the doAction function?



///////////////////////////////////////
///////////// VARIABLES ///////////////
///////////////////////////////////////

// console logs file initialization
console.log('loading liri.js');

// requires the keys.js file
const keys = require('./keys.js');

// packages
const fs = require('fs');
var Twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');

// user inputs command to perform a desired action
let command = process.argv[2];
let inputQuery = process.argv[3];

///////////////////////////////////////
//////////// SWITCH STATEMENT /////////
///////////////////////////////////////

switch (command) {
	case 'my-tweets':
		console.log(' ');
		console.log('TWEETS');
		console.log('__________________________________');
		console.log('__________________________________');
		twitterAction();
	break;

	case 'spotify-this-song':
		console.log(' ');
		console.log('SPOTIFY');
		console.log('__________________________________');
		console.log('__________________________________');
		spotifyAction();
	break;

	case 'movie-this':
		console.log(' ');
		console.log('MOVIE');
		console.log('__________________________________');
		console.log('__________________________________');
		movieAction();
	break;

	case 'do-what-it-says':
		console.log(' ');
		console.log('DO WHAT IT SAYS');
		console.log('__________________________________');
		console.log('__________________________________');
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
	let client = new Twitter(keys.twitterKeys);

	// creates search query
	var params = {screen_name: 'nvTweetsJS'};

	// creates request and prints data
	client.get('statuses/user_timeline', params, function(error, tweets, response) {

		// if there are no errors, go through this loop and console log the data from each tweet returned
		if (!error) {
			// console.log(tweets);
			for (let i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at);
				console.log(' ');
				console.log(tweets[i].text);
			}

		// console log message if there is an error
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
	 
	// variable for spotify auth keys
	let spotifyQuery = new spotify(keys.spotifyKeys);
	 
	// spotify search query
	spotifyQuery.search({ type: 'track', query: inputQuery }, function(err, data) {

	     // check for errors
	     if (err) {
	       return console.log('Error occurred: ' + err);
	     } 

		 // console logs data returned
		 // console.log(JSON.stringify(data, null, 2)); 
		 
		 // creates variable for object path to songs 
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
	});
};

// performs omdb search
function movieAction() {

	// call to omdb server using "request" package
	const apiKey = '40e9cece';
	let movieSearch = request(("http://www.omdbapi.com/?t=" + inputQuery + "&y=&plot=short&r=json&apikey=" + apiKey), function (err, response, body) {
		
		// check for errors
		if (err) throw err;

		// console.log(JSON.stringify(response, null, 2));

		// grabs json response and stores in a variable
		let jsonData = JSON.parse(body);

		if (inputQuery === '') {
			inputQuery === "Mr. Nobody";
			console.log('inputQuery: ' + inputQuery)

		} else {

			// logs out movie info
			console.log(' ');
			console.log(`Movie Title: ${jsonData.Title}`);
			console.log(`Year: ${jsonData.Year}`);
			console.log(`IMDB Rating: ${jsonData.imdbRating}`);
			console.log(`Rating: ${jsonData.Rated}`);
			console.log(`Country: ${jsonData.Country}`);
			console.log(`Plot: ${jsonData.Plot}`);
			console.log(`Actors: ${jsonData.Actors}`);
			console.log(' ');
		 	console.log('__________________________________');
	 	}

	});
};


// performs do-what-it-says action
// pulls data from random.txt
function doAction() {

	// .txt file
	const randomTxt = 'random.txt';

	fs.readFile(randomTxt, 'utf8', function(error, data) {

		// displays input
		console.log(`Here's what it says to do: ${data}`)

		// error handling
		if (error) {
			console.log('There was an error: ' + error);
		} else {

			// splits command and inputQuery content into an array at each comma
			let txtContent = data.split(',');

			// assigns node command line argument variables to respective items in array
			command = txtContent[0];
			inputQuery = txtContent[1];
			
			// 
			switch (command) {
				case 'my-tweets':
					twitterAction();
				break;

				case 'spotify-this-song':
					spotifyAction();
				break;

				case 'movie-this':
					movieAction();
				break;

				case 'do-what-it-says':
					doAction();
				break;

				case 'default':
					console.log('default');
			};
		};
	});
};

