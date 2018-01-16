# Particle claim devices example
*Allows bulk claiming of devices from a file of device IDs*

## To use it:

- Install [nodejs](https://nodejs.org/) if you haven't already done so. I recommend the LTS version.
- Download this repository.
- Install the dependencies

```
cd particle-node-api-examples/claim-devices
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
npm start deviceIdFile.txt
```

The deviceIdFile.txt is a file containing device Ids (24-character hex), one per line.

There are additional tips in the README.md in the top level of particle-node-api-example as well.
