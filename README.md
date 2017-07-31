# parse gpx

[![codecov.io](https://codecov.io/github/dmamills/parse-gpx/coverage.svg?branch=master)](https://codecov.io/github/dmamills/parse-gpx?branch=master) [![Build Status](https://secure.travis-ci.org/dmamills/parse-gpx.png)](http://travis-ci.org/dmamills/parse-gpx)

Parses gpx files into json for data processing, for..................reasons.

# usage

The gpx file will be converted to an Array of `TrackPoint` objects. Containing the latitude, longitude, elevation, and a timestamp.

```javascript
const parseGpx = require('parse-gpx');

let file = './path/to/some.gpx';

parseGpx(file).then(track => {
    console.log(track[0].latitude); // 43.512926660478115
});
```

# dev

```
npm test
npm run coverage
```

# license

> do wutever u want whenever u want
