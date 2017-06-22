var firstname = "Nick";
var number = 10;

var test = function(name) {
	var greeting = "Hi, ";
	console.log(greeting + name);
	console.log(arguments);
};

function operation() {
	console.log('______________');
	console.log(`Original number: ${number}`);
	console.log('Performing operation...');
	var newnumber = number * 10;
	console.log(`Your new number is: ${newnumber}`);
}

test(firstname);

