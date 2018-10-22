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

const argv = require('yargs')
	.usage('Usage: $0 [options] --productId=NN')
	.alias('p', 'productId')
	.nargs('p', 1)
	.describe('p', 'product ID to add to (required)')
	.argv;

var productId = parseInt(argv.p);
if (isNaN(productId)) {
	console.log("invalid productId");
	return 1;
}
console.log("productId=" + productId);

var page = 0;
getNextPage();

function getNextPage() {
	// You must set AUTH_TOKEN in an enviroment variable!
	particle.listSIMs({ auth:config.get('AUTH_TOKEN'), page:page++, perPage:100, product:productId }).then(
			function(result) {
				// console.log("result", result);
				for(var ii = 0; ii < result.body.sims.length; ii++) {
					// console.log("ii=", result.body.sims[ii]);
					
					var sim = result.body.sims[ii];
					
				    console.log(sim._id);
				    
				}			
			    if (page <= result.body.meta.total_pages) {
			    	getNextPage();
			    }
			},
			function(err) {
				console.log("error listing sims", err);
			}
	);
}
