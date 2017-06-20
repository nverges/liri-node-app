// console logs file initialization
console.log('loading liri.js');

// packages
var fs = require('fs');
var spotify = require('spotify-api')

// requires the keys.js file
var keys = require('./keys');

// API key values pulled from keys.js
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;

// user inputs command to perform a desired action
var command = process.argv[2];
var query = process.argv[3];


switch (command) {
	case 'my-tweets':
		console.log('tweets');
	break;

	case 'spotify-this-song':
		console.log('spotify this');
	break;

	case 'movie-this':
		console.log('movie this');
	break;

	case 'do-what-it-says':
		console.log('do what it says');
	break;

	case 'default':
		console.log('default');
};


//////////////////////////////////////////////////////
/////// FUNCTIONS ////////////////////////////////////
//////////////////////////////////////////////////////

function twitter() {

};

function spotify() {

};

function movie() {

};

function action() {

};

