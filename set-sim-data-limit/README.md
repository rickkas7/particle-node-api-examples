# Particle set sim data limit example
*Simple example program setting the data limit on SIMs *

## To use it:

- Install [nodejs](https://nodejs.org/) if you haven't already done so. I recommend the LTS version.
- Download this repository.
- Install the dependencies

```
cd particle-node-api-examples/set-sim-limits
npm install
```

- Get an auth token. The easiest place is in the settings icon at [https://build.particle.io](https://build.particle.io).

- Set your auth token:

Mac or Linux:

```
export AUTH_TOKEN=fe12630d2dbbd1ca6e8e28bd5a4b953dd3f1c53f
```

Windows:

```
set AUTH_TOKEN=fe12630d2dbbd1ca6e8e28bd5a4b953dd3f1c53f
```

- Run the program:

```
node product-activate-sims.js --productId=6287 --limit=10 sims.txt
```

The productId is required for product SIMs.

The limit is the data limit in MB. The minimum is 1 and the maximum is 500.

The sims.txt file is a file of ICCIDs, one per line.

There are additional tips in the README.md in the top level of particle-node-api-example as well.
