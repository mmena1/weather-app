const axios = require("axios");
var forecast = (address) => {
    var encodedAddress = encodeURIComponent(address);

    var apiKey = 'AIzaSyDXyJQvmt9F-EpfL1EfQhQpP41k1GegCHA';
    var geocode = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    axios.get(geocode).then((response) => {
        if (response.data.results === "ZERO_RESULTS") {
            console.log('throw');
            throw new Error('Unable to find address.')
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/c316024a0f69a267d276d600946bc3a7/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    }).then((response) => { // called when weather data comes back
        return {
            temperature: response.data.currently.temperature,
            apparenTemperature: response.data.currently.temperature
        };
        // var temperature = response.data.currently.temperature;
        // var apparenTemperature = response.data.currently.apparentTemperature;
        // console.log(`It's currently ${temperature}, but it feels like ${apparenTemperature}`);
    })
    //     .catch((e) => {
    //     if (e.code === 'ENOTFOUND') {
    //         condole.log('Unable to connecto to API servers.')
    //     } else {
    //         console.log(e.message);
    //     }
    //     //console.log(e);
    // });
};

module.exports.forecast = forecast;