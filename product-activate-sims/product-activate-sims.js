// 1. Install dependencies
// 	npm install
// 
// 2. Set your auth token:
//  export AUTH_TOKEN=xxxxxxx
// You can generate one, or get it from the Settings tab at https://build.particle.io.
// 
// 3. Run the program:
//	node product-activate-sims.js --productId=6287 sims.txt
// 
// You can also save the auth token in a file config.json that will be read at startup if present.
const config = require('./config');

var Particle = require('particle-api-js');
var particle = new Particle();

const argv = require('yargs')
	.usage('Usage: $0 [options] --productId=NN <sim_file...>')
	.alias('p', 'productId')
	.nargs('p', 1)
	.describe('p', 'product ID to add to (required)')
	.alias('c', 'country')
	.nargs('c', 1)
	.describe('c', 'country code, US if not specified')
	.argv;

//  	.demandOption(['p'])

const fs = require('fs');

var iccids = [];

var productId = parseInt(argv.p);
if (isNaN(productId)) {
	console.log("--productId=NNN required");
	return 1;	
}
console.log("productId=" + productId);

var country = 'US';
if (!!argv.c && argv.c != '') {
	country = argv.c;
}
console.log("country=" + country);

if (argv._.length == 0) {
	console.log("file of ICCIDs is required");
	return 1;
}

for(var ii = 0; ii < argv._.length; ii++) {
	processFile(argv._[ii]);
}

if (iccids.length == 0) {
	console.log("no ICCIDs in <sim_file>");
	return 1;	
}

// You must set AUTH_TOKEN in an enviroment variable!

// There may be a bug in the particle API js library, in the file Particle.js. The code reads:
//
//	var data = product ? { sims: iccids, countryCode: countryCode } : { countryCode: countryCode, promoCode: promoCode, action: 'activate' };
//
// However I always get 
// { ok: false,  error: 'You must pass an ISO 3166-1 Alpha-2 country code to import SIM cards' }
// 
// Looking at the cloud API, the country should be in country, not countryCode
// https://docs.particle.io/reference/api/#activate-sim
//
// Changing the line of code to:
//
// 			var data = product ? { sims: iccids, country: countryCode } : { countryCode: countryCode, promoCode: promoCode, action: 'activate' };
//
// results in successful execution. 


var req = { auth:config.get('AUTH_TOKEN'), iccids:iccids, countryCode:country, product:productId };

console.log("request", req);

particle.activateSIM(req).then(
		function(data) {
			console.log("added SIMs", data);
		},
		function(err) {
			console.log("error adding SIMs", err);
		}
		);

function processFile(name) {
	console.log(name);
	
	var data = fs.readFileSync(name, 'utf8');
	
	var re = /[0-9]{18,22}/;
	var a = data.split("\n");
	for(var ii = 0; ii < a.length; ii++) {
		var iccid = a[ii].trim();
		if (re.test(iccid)) {
			console.log(iccid);
			iccids.push(iccid);
		}
	}
}
