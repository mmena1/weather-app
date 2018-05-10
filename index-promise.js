const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
  .options({
    a: {
      demand: true, // required
      alias: "address", // can be passed the argument as -a or --address
      describe: "Address to fetch weather for",
      string: true // parse the argument as string
    }
  })
  .help() // if running with --help flag, it will list the available options and descriptions
  .alias("help", "h")
  .argv; // to use -h or --help // runs all the previous configurations and stores in the argv variable

var encodedAddress = encodeURIComponent(argv.address);

var apiKey = 'AIzaSyDXyJQvmt9F-EpfL1EfQhQpP41k1GegCHA';
var geocode = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

axios.get(geocode).then((response) => {
  console.log(typeof response.data.status);
  console.log(response.data);
  if (response.data.results == "ZERO_RESULTS") {
    console.log('throw');
    throw new Error('Unable to find address.')
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/c316024a0f69a267d276d600946bc3a7/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => { // called when weather data comes back
  var temperature = response.data.currently.temperature;
  var apparenTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}, but it feels like ${apparenTemperature}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    condole.log('Unable to connecto to API servers.')
  } else {
    console.log(e.message);
  }
  //console.log(e);
});