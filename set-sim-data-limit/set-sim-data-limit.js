// 1. Install dependencies
// 	npm install
// 
// 2. Set your auth token:
//  export AUTH_TOKEN=xxxxxxx
// You can generate one, or get it from the Settings tab at https://build.particle.io.
// 
// 3. Run the program:
//	node set-sim-data-limit.js --productId=1234 --limit=5 sims.txt
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
	.alias('l', 'limit')
	.nargs('l', 1)
	.describe('l', 'limit in MB (default: 5)')
	.argv;

//  	.demandOption(['p'])

const fs = require('fs');

var iccids = [];

var productId = parseInt(argv.p);
if (isNaN(productId)) {
	productId = null;
}
console.log("productId=" + productId);

var limit = parseInt(argv.l);
if (isNaN(productId)) {
	limit = 5;
}
console.log("limit=" + 5);

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


var index = 0;
setNextLimit();

function setNextLimit() {
	if (index < iccids.length) {
		var req = { auth:config.get('AUTH_TOKEN'), iccid:iccids[index], mbLimit:limit };
		
		if (productId != null) {
			req.product = productId;
		}
		index++;

		console.log("request", req);
		

		particle.updateSIM(req).then(
				function(data) {
					console.log("updated SIMs", data);
					setNextLimit();
				},
				function(err) {
					console.log("error updating sim data limit", err);
				}
				);
	}
}

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
