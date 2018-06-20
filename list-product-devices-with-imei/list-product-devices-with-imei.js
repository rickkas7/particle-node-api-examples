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

const argv = require('yargs')
.usage('Usage: $0 [options] --productId=NN')
.alias('p', 'productId')
.nargs('p', 1)
.describe('p', 'product ID to list (required)')
.argv;

const fs = require('fs');


var productId = parseInt(argv.p);
if (isNaN(productId)) {
	console.log("--productId=NNN required");
	return 1;	
}
console.log("productId=" + productId);


// You must set AUTH_TOKEN in an enviroment variable!


//You must set AUTH_TOKEN in an enviroment variable!
particle.listDevices({ auth:config.get('AUTH_TOKEN') }).then(
		function(devices) {
			// console.log("devices", devices);
			for(var ii = 0; ii < devices.body.length; ii++) {
				console.log(devices.body[ii].id + "," + devices.body[ii].imei + "," + devices.body[ii].name );
			}
		},
		function(err) {
			console.log("error listing devices", err);
		}
		);
