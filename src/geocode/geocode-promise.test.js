var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const geocode = require("./geocode-promise");
describe('geocode-promise test suite', function () {
    it('should return address details', function () {
        return expect(geocode.geocodeAddress('19147')).to.eventually.deep.equal(
            {
                address: "Philadelphia, PA 19147, USA",
                latitude: 39.9350642,
                longitude: -75.1516194
            }
        );

    });

    it('should return error message', function() {
        return expect(geocode.geocodeAddress('0000qwe')).to.eventually.be.rejectedWith("Unable to find that address");

    });
});