// 1. Install dependencies
// 	npm install
// 
// 2. Set your auth token:
//  export AUTH_TOKEN=xxxxxxx
// You can generate one, or get it from the Settings tab at https://build.particle.io.
// 
// 3. Run the program:
//	npm start
//
// You can also save the auth token in a file config.json that will be read at startup if present.
const config = require('./config');

var Particle = require('particle-api-js');
var particle = new Particle();

var index = 0;

// You must set AUTH_TOKEN in an enviroment variable!
particle.listDevices({ auth:config.get('AUTH_TOKEN') }).then(
		function(devices) {
			// console.log("devices", devices);
			for(var ii = 0; ii < devices.body.length; ii++) {
				if (devices.body[ii].product_id < 100) {
					console.log(++index + "," + devices.body[ii].id + "," + devices.body[ii].name + "," + devices.body[ii].product_id);
				}
			}
		},
		function(err) {
			console.log("error listing devices", err);
		}
		);
