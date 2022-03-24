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
    const expectedProperties = ['latitude', 'longitude', 'timestamp', 'elevation', 'heartrate', 'cadence'];
    expectedProperties.forEach(prop => {
      tp.should.have.property(prop);
    });

    tp = new TrackPoint(1,2,3,"2016-06-09T15:59:45.000Z", 160);
    tp.heartrate.should.equal(160);

    tp = new TrackPoint(1,2,3,"2016-06-09T15:59:45.000Z", null, 180);
    tp.cadence.should.equal(180);
  });
})

const testStr = fs.readFileSync(`${__dirname}/test.gpx`);

describe('parseTrack', () => {
  it('should parse gpx track', () => {
    let parser = new xml2js.Parser();
    parser.parseString(testStr, (err, xml) => {
      let result = parseTrack(xml.gpx.trk);
      result[0].should.be.instanceOf(TrackPoint);
    });
  });
});

describe('parse gpx', () => {
  it('return an array', async () => {
    const data = await parseGpx(testStr);
    data.should.be.Array();
  });

  it('array should contain TrackPoints', async () => {
    const data = await parseGpx(testStr);
    data.forEach(t => t.should.be.instanceOf(TrackPoint));
  });

  it('trackpoints should have longitude when attribute named lon', async () => {
    const testLonStr = fs.readFileSync(`${__dirname}/test-lon.gpx`);
    const data = await parseGpx(testLonStr);
    let tp = data[0];
    tp.should.have.property('longitude');
  });

  it('should have heartrate if found', async () => {
    const heartrateStr = fs.readFileSync(`${__dirname}/heartrate.gpx`);
    const data = await parseGpx(heartrateStr);
    let tp = data[0];
    tp.heartrate.should.equal('114');
  });

  it('should have cadence if found', async () => {
    const cadenceStr = fs.readFileSync(`${__dirname}/cadence.gpx`);
    const data = await parseGpx(cadenceStr);
    let tp = data[0];
    tp.cadence.should.equal('99');
  });

  it('should return an error when unable to parse xml', async () => {
    const invalidStr = fs.readFileSync(`${__dirname}/invalid.gpx`);
    try {
      await parseGpx(invalidStr);
    } catch (err) {
      err.should.be.instanceOf(Error);
    };
  });
});
