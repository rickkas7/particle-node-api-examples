# deactivate-developer-sims
*Deactivate Developer SIMs from a text file of ICCIDs*

## To use it:

- Install [nodejs](https://nodejs.org/) if you haven't already done so. I recommend the LTS version.
- Download this repository.
- Install the dependencies

```
cd particle-node-api-examples/deactivate-developer-sims
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
npm start sims.txt
```

The sims.txt is a file containing SIM ICCIDs, one per line.

There are additional tips in the README.md in the top level of particle-node-api-example as well.
