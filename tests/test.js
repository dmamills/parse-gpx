"use strict";

const should = require('should');
const parseGpx = require('../');
const TrackPoint = require('../src/TrackPoint');
const parseTrack = require('../src/parseTrack');

const fs = require('fs');
const xml2js = require('xml2js');

describe('TrackPoint', () => {
    it('should be constructable!', () => {
        let tp = new TrackPoint(1,2,3,"2016-06-09T15:59:45.000Z");

        tp.should.have.property('latitude');
        tp.should.have.property('longitude');
        tp.should.have.property('timestamp');
        tp.should.have.property('elevation');
        tp.should.have.property('heartrate');
        tp.should.have.property('cadence');

        tp = new TrackPoint(1,2,3,"2016-06-09T15:59:45.000Z", 160);
        tp.heartrate.should.equal(160);

        tp = new TrackPoint(1,2,3,"2016-06-09T15:59:45.000Z", null, 180);
        tp.cadence.should.equal(180);

    });
})

describe('parseTrack', () => {
    it('should parse gpx track', () => {
        fs.readFile(__dirname + '/test.gpx','utf8', (err, data) => {
            let parser = new xml2js.Parser();
            parser.parseString(data, (err, xml) => {
                let result = parseTrack(xml.gpx.trk);

                result[0].should.be.instanceOf(TrackPoint);
            });
        });
    });
});

describe('parse gpx', () => {
    it('return an array', () => {
        parseGpx(__dirname + '/test.gpx').then(data => {
            data.should.be.Array();
        });
    });

    it('array should contain TrackPoints', () => {
        parseGpx(__dirname + '/test.gpx').then(data => {
            data.forEach(t => {
                t.should.be.instanceOf(TrackPoint);
            });
        });
    });

    it('trackpoints should have all expected attributes', () => {
        parseGpx(__dirname + '/test.gpx').then(data => {
            let tp = data[0];

            tp.should.have.property('latitude');
            tp.should.have.property('longitude');
            tp.should.have.property('timestamp');
            tp.should.have.property('elevation');
        });
    });

    it('trackpoints should have longitude when attribute named lon', () => {
        parseGpx(__dirname + '/test-lon.gpx').then(data => {
            let tp = data[0];
            tp.should.have.property('longitude');
        });
    });


    it('should have heartrate if found', () => {
        parseGpx(__dirname + '/heartrate.gpx').then(data => {
            let tp = data[0];
            tp.heartrate.should.equal('114');
        });
    });

    it('should have cadence if found', () => {
        parseGpx(__dirname + '/cadence.gpx').then(data => {
            let tp = data[0];
            tp.cadence.should.equal('99');
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
