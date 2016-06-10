"use strict";

class TrackPoint {
    constructor(el, lat, lng, time) {
        this.elevation = el;
        this.latitude = lat;
        this.longitude = lng;
        this.timestamp = time;
    }
}

module.exports = TrackPoint;
