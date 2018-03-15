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

// You must set AUTH_TOKEN in an enviroment variable!
particle.listSIMs({ auth:config.get('AUTH_TOKEN') }).then(
		function(result) {
			//console.log("result", result);
			for(var ii = 0; ii < result.body.sims.length; ii++) {
				// console.log("ii=", result.body.sims[ii]);
				
				var sim = result.body.sims[ii];
				console.log(sim._id);
			}			
		},
		function(err) {
			console.log("error listing sims", err);
		}
);
