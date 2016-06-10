"use strict";

const should = require('should');
const parseGpx = require('../');
const TrackPoint = require('../src/TrackPoint');

describe('parse gpx', () => {
    it('return an array', () => {
        parseGpx('test.gpx').then(data => {
            data.should.be.Array();
        });
    });


    it('array should contain TrackPoints', () => {
        parseGpx('test.gpx').then(data => {
            data.forEach(t => {
                t.should.be.instanceOf(TrackPoint);
            });
        });
    });

    it('trackpoints should have all expected attributes', () => {
        parseGpx('test.gpx').then(data => {
            let tp = data[0];

            tp.should.have.property('latitude');
            tp.should.have.property('longitude');
            tp.should.have.property('timestamp');
            tp.should.have.property('elevation');
        });
    });
    it('should return an error when unable to parse xml', () => {
        parseGpx(__dirname + '/invalid.gpx').then(()=>{}, err => {
            err.should.be.instanceOf(Error);
        });
    });

    it('should return an error when given a non existant file', () => {
        parseGpx('nonexistant.gpx').then(()=>{}, err => {
            err.should.be.instanceOf(Error);
            err.errno.should.be.equal(-2);
        });
    });

});
