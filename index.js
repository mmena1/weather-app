const yargs = require('yargs');

const geocode = require('./geocode/geocode');

const argv = yargs
  .options({
    a: {
      demand: true, // required
      alias: 'address', // can be passed the argument as -a or --address
      describe: 'Address to fetch weather for',
      string: true // parse the argument as string
    }
  })
  .help() // if running with --help flag, it will list the available options and descriptions
  .alias('help', 'h') // to use -h or --help
  .argv; // runs all the previous configurations and stores in the argv variable

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});