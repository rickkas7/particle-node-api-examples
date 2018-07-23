# Particle list unclaimed product devices example
*Prints device id and name for unclaimed devices in a product*

## To use it:

- Install [nodejs](https://nodejs.org/) if you haven't already done so. I recommend the LTS version.
- Download this repository.
- Install the dependencies

```
cd particle-node-api-examples/list-unclaimed-product-devices
npm install
```

- Get an auth token. The easiest place is to go into your product, Events, and View In Terminal. Copy the
access token from there.
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
node list-unclaimed-product-devices.js --productId=1234
```

The --productId option is required and must be the numeric product ID.

There are additional tips in the README.md in the top level of particle-node-api-example as well.
