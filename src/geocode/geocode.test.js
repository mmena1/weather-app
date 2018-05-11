const geocode = require('./geocode');
const assert = require("assert");
var expect = require('chai').expect;

describe('our test suite', function () {
    it('should return address details (using assert)', function() {
        return geocode.geocodeAddress('19147', (errorMessage, results) => {
            assert.notEqual(results, undefined);
            assert.equal(errorMessage, undefined);
            console.log('Test');
            console.log(results.address);
            assert.equal(results.address, "Philadelphia, PA 19147, USA");
            assert.equal(results.latitude, 39.9350642);
            assert.equal(results.longitude, -75.1516194);
        });
    });

    it('should return error message (using assert)', function() {
        geocode.geocodeAddress('0000qwe', (errorMessage, results) => {
            assert.equal(results, undefined);
            assert.notEqual(errorMessage, undefined);
            assert.equal(errorMessage, "Unable to find address");
        });
    });

    it('should return address details (using chai)', function() {
        geocode.geocodeAddress('19147', (errorMessage, results) => {
            expect(results).not.to.be.undefined;
            expect(errorMessage).to.be.undefined;
            expect(results.address).to.equal("Philadelphia, PA 19147, USA");
            expect(results.latitude).to.equal(39.9350642);
            expect(results.longitude).to.equal(-75.1516194);

        });
    });

    it('should return error message (using chai)', function() {
        geocode.geocodeAddress('0000qwe', (errorMessage, results) => {
            expect(errorMessage).not.to.be.undefined;
            expect(results).to.be.undefined;
            expect(errorMessage).to.equal("Unable to find address");
            assert.equal(results, undefined);
        });
    });
});