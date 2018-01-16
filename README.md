# particle-node-api-examples

**Example code for using the Particle API from node.js (Javascript)**

Most of the samples here use the same general example format.

## To use it:

- Install [nodejs](https://nodejs.org/) if you haven't already done so. I recommend the LTS version.
- Download this repository.
- Install the dependencies

```
cd particle-node-api-examples/list-devices
npm install
```

- Get an auth token. The easiest place is in the settings icon at [https://build.particle.io](https://build.particle.io). (Some examples may require a product access token instead.)

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
npm start
```

## Other ways of handling your auth token

In addition to setting it in an environment variable, you can set it in command line argument:

```
node listdevices.js --AUTH_TOKEN fe12630d2dbbd1ca6e8e28bd5a4b953dd3f1c53f
```

Or in a file config.json in the same directory as config.js:

```
{
	"AUTH_TOKEN":"fe12630d2dbbd1ca6e8e28bd5a4b953dd3f1c53f"
}
```

## Building on the example

This is also a handy template for building your own programs. If you have additional configurable parameters, add them to config.js. You can also set default values there.

And of course you could easily change the format of the output, or make other particle-api-js calls other than list devices.


