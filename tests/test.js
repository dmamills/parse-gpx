require('should');

const parseGpx = require('../');
const TrackPoint = require('../src/TrackPoint');
const Track = require('../src/Track');
const fs = require('fs');

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

describe('parse gpx', () => {
  it('return an instance of Track', async () => {
    const track = (await parseGpx(testStr));
    track.should.be.instanceOf(Track)
  });

  it('array should contain TrackPoints', async () => {
    const data = (await parseGpx(testStr)).trackPoints;
    data.forEach(t => t.should.be.instanceOf(TrackPoint));
  });

  it('trackpoints should have longitude when attribute named lon', async () => {
    const testLonStr = fs.readFileSync(`${__dirname}/test-lon.gpx`);
    const data = (await parseGpx(testLonStr)).trackPoints;
    let tp = data[0];
    tp.should.have.property('longitude');
  });

  it('should have heartrate if found', async () => {
    const heartrateStr = fs.readFileSync(`${__dirname}/heartrate.gpx`);
    const data = (await parseGpx(heartrateStr)).trackPoints;
    let tp = data[0];
    tp.heartrate.should.equal(114);
  });

  it('should have cadence if found', async () => {
    const cadenceStr = fs.readFileSync(`${__dirname}/cadence.gpx`);
    const data = (await parseGpx(cadenceStr)).trackPoints;
    let tp = data[0];
    tp.cadence.should.equal(99);
  });

  it('should return an error when unable to parse xml', async () => {
    const invalidStr = fs.readFileSync(`${__dirname}/invalid.gpx`);
    try {
      await parseGpx(invalidStr);
    } catch (err) {
      err.should.be.instanceOf(Error);
    };
  });

  it('should calculate total distance', async () => {
    const testLonStr = fs.readFileSync(`${__dirname}/test-lon.gpx`);
    const track = await parseGpx(testLonStr);
    parseInt(track.totalDistance()).should.equal(19287);
  });
});
