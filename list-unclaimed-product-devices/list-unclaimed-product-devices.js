// 1. Install dependencies
// 	npm install
// 
// 2. Set your auth token:
//  export AUTH_TOKEN=xxxxxxx
// You can generate one, or get it from the Settings tab at https://build.particle.io.
// 
// 3. Run the program:
//	node list-product-devices-with-imei.js --productId=1234
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
//console.log("productId=" + productId);


// You must set AUTH_TOKEN in an enviroment variable!


//You must set AUTH_TOKEN in an enviroment variable!
var page = 1;
var perPage = 100;

var onlineDevices = [];
var offlineDevices = [];

function getNextPage() {	
	
	particle.listDevices({ auth:config.get('AUTH_TOKEN'), product:productId, page:page, perPage:perPage }).then(
			function(devices) {
				//console.log("devices", devices);
				
				var deviceArray = devices.body.devices;
				
				console.log("checking page " + page + " " + deviceArray.length + " devices");
				
				// console.log("devices", devices);
				for(var ii = 0; ii < deviceArray.length; ii++) {
					if (deviceArray[ii].user_id == undefined) {
						if (deviceArray[ii].online) {
							onlineDevices.push(deviceArray[ii]);
						}
						else {
							offlineDevices.push(deviceArray[ii]);							
						}
					}
				}
				
				page++;
				if (page <= devices.body.meta.total_pages) {
					getNextPage();
				}	
				else {
					console.log("Unclaimed devices that have been online:");
					for(var ii = 0; ii < onlineDevices.length; ii++) {
						console.log(onlineDevices[ii].id + "," + onlineDevices[ii].name + "," + onlineDevices[ii].last_handshake_at);
					}
					
					console.log("");
					console.log("Unclaimed devices that have never been online:");
					for(var ii = 0; ii < offlineDevices.length; ii++) {
						console.log(offlineDevices[ii].id + "," + offlineDevices[ii].name);
					}
					

				}
			},
			function(err) {
				console.log("error listing devices", err);
			}
			);
};

getNextPage();
