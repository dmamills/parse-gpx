"use strict";
const TrackPoint = require('./TrackPoint');

const parseTrack = track =>  {

    track = track[0].trkseg[0].trkpt;
    return track.map(t => {
        return new TrackPoint(
                t.ele[0],
                t['$'].lat,
                t['$'].lon,
                t.time[0]
        );
    });
};

module.exports = parseTrack;
