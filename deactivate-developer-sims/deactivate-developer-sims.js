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

var iccids = [];


if (argv._.length == 0) {
	console.log("file of SIM ICCIDs is required");
	return 1;
}

for(var ii = 0; ii < argv._.length; ii++) {
	processFile(argv._[ii]);
}

// You must set AUTH_TOKEN in an enviroment variable!

deactivateNext();


function processFile(name) {
	console.log(name);
	
	var data = fs.readFileSync(name, 'utf8');
		
	var re = /[0-9]{19}/;
	var a = data.split("\n");
	for(var ii = 0; ii < a.length; ii++) {
		var iccid = a[ii].trim();
		if (re.test(iccid)) {
			iccids.push(iccid);
		}
	}
}

function deactivateNext() {
	if (iccids.length == 0) {
		return;
	}
	var iccid = iccids.shift();
	console.log("deactivating " + iccid + "...");
	
	particle.deactivateSIM({ iccid: iccid, auth:config.get('AUTH_TOKEN') }).then(
			function(data) {
				console.log("  success!");
				deactivateNext();
			},
			function(err) {
				console.log("  failed " + iccid, err);
				deactivateNext();
			}
			);
	
} 
