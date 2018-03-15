// 1. Install dependencies
// 	npm install
// 
// 2. Set your auth token:
//  export AUTH_TOKEN=xxxxxxx
// You can generate one, or get it from the Settings tab at https://build.particle.io.
// 
// 3. Run the program:
//	node claim-devices.js <file_of_device_ids>
//
// You can also save the auth token in a file config.json that will be read at startup if present.
const config = require('./config');

var Particle = require('particle-api-js');
var particle = new Particle();

const argv = require('yargs').argv

const fs = require('fs');

var deviceIds = [];


if (argv._.length == 0) {
	console.log("file of device IDs is required");
	return 1;
}

for(var ii = 0; ii < argv._.length; ii++) {
	processFile(argv._[ii]);
}

// You must set AUTH_TOKEN in an enviroment variable!

claimNext();


function processFile(name) {
	console.log(name);
	
	var data = fs.readFileSync(name, 'utf8');
	
	var re = /[A-Fa-f0-9]{24}/;
	var a = data.split("\n");
	for(var ii = 0; ii < a.length; ii++) {
		var deviceId = a[ii].trim();
		if (re.test(deviceId)) {
			deviceIds.push(deviceId);
		}
	}
}

function claimNext() {
	if (deviceIds.length == 0) {
		return;
	}
	var deviceId = deviceIds.shift();
	console.log("claiming " + deviceId + "...");
	
	particle.claimDevice({ deviceId: deviceId, auth:config.get('AUTH_TOKEN') }).then(
			function(data) {
				console.log("  success!");
				claimNext();
			},
			function(err) {
				console.log("  failed " + deviceId, err);
				claimNext();
			}
			);
	
} 
