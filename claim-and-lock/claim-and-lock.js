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
.usage('Usage: $0 [options] --productId=NN --version=XX <deviceid_file...>')
.alias('f', 'firmware')
.nargs('f', 1)
.describe('f', 'firmware version number to lock to')
.alias('p', 'productId')
.nargs('p', 1)
.describe('p', 'product ID to add to (required)')
.argv;

const fs = require('fs');

var deviceIds = [];


if (argv._.length == 0) {
	console.log("file of device IDs is required");
	return 1;
}

var productId = parseInt(argv.p);
if (isNaN(productId)) {
	console.log("--productId=NNN required");
	return 1;	
}
console.log("productId=" + productId);

var firmware = parseInt(argv.f);
console.log("firmware=" + firmware);

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

	console.log("adding to product " + deviceId + "...");
	
	particle.addDeviceToProduct({ deviceId: deviceId, product:productId, auth:config.get('AUTH_TOKEN') }).then(
			function(data) {
				console.log("claiming " + deviceId + "...");
				
				particle.claimDevice({ deviceId: deviceId, auth:config.get('AUTH_TOKEN') }).then(
					function(data) {
						console.log("  success!");
						if (firmware) {
							console.log("locking " + deviceId + " to " + firmware + "...");
							particle.lockDeviceProductFirmware({deviceId: deviceId, auth:config.get('AUTH_TOKEN'), product:productId, desiredFirmwareVersion:firmware, flash:true}).then(
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
						else {
							claimNext();				
						}
					},
					function(err) {
						console.log("  failed " + deviceId, err);
						claimNext();
					}
				);
			},
			function(err) {
				console.log("  failed " + deviceId, err);
				claimNext();
			}
			);

	
} 
