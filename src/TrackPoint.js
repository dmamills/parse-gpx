"use strict";

class TrackPoint {
    constructor(el, lat, lng, time, heartrate, cadence) {
        this.elevation = el;
        this.latitude = lat;
        this.longitude = lng;
        this.timestamp = time;
        this.heartrate = heartrate;
        this.cadence = cadence;
    }
}

module.exports = TrackPoint;
