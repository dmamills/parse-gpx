# parse gpx

[![codecov.io](https://codecov.io/github/dmamills/parse-gpx/coverage.svg?branch=master)](https://codecov.io/github/dmamills/parse-gpx?branch=master) [![Build Status](https://secure.travis-ci.org/dmamills/parse-gpx.png)](http://travis-ci.org/dmamills/parse-gpx)

Parses gpx into json for data processing, for..................reasons.

## usage

Note: Version `2.0` no longer takes a file as an input. It takes an XML string instead

```javascript
const fs = require('fs');
const parseGpx = require('parse-gpx');

let gpxContent = fs.readFileSync('./path/to/some.gpx');

parseGpx(file).then(track => {
    console.log(track.totalDistance()); //8824.24 (metres)

    /*
     {
       latitude: string
       longitude: string
       timestamp: string
       elevation: number
       cadence: number
       heartrate: number
       distanceFromPoint: (trackPoint) => number (distance in metres)
     }
    */
    console.log(track.trackPoints[0]);
});
```

# dev

```
npm test
npm run coverage
```

# license

> do wutever u want whenever u want
