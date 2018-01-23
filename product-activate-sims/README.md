# Particle list devices example
*Simple example program for listing devices in your account, and a handy template for other things*

## To use it:

- Install [nodejs](https://nodejs.org/) if you haven't already done so. I recommend the LTS version.
- Download this repository.
- Install the dependencies

```
cd particle-node-api-examples/product-activate-sims
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
node product-activate-sims.js --productId=6287 sims.txt
```

You must specify the productId to import to. If you are not in the US, you must also specify a country:

```
node product-activate-sims.js --productId=6287 --country=ES sims.txt
```

The sims.txt file is a file of ICCIDs, one per line.


There are additional tips in the README.md in the top level of particle-node-api-example as well.
