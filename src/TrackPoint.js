const haversine = require('haversine-distance');
const moment = require('moment')

class TrackPoint {
    constructor(el, lat, lng, time, heartrate, cadence) {
        this.elevation = el ? parseFloat(el) : undefined;
        this.latitude = lat;
        this.longitude = lng;
        this.timestamp = time;
        this.heartrate = heartrate ? parseInt(heartrate) : undefined;
        this.cadence = cadence ? parseInt(cadence) : undefined;
    }

    /**
     * Calculates the distance between two points in metres
     * @param {*} trackPoint
     * @returns {number} distance in metres
     */
    distanceFromPoint(trackPoint) {
        const a = { latitude: this.latitude, longitude: this.longitude};
        const b = { latitude: trackPoint.latitude, longitude: trackPoint.longitude };
        return haversine(a, b);
    }

   //speedFromPoint(trackPoint) {
   //    const distanceBetween = this.distanceFromPoint(trackPoint);
   //    const aTime = moment(this.timestamp)
   //    const bTime = moment(trackPoint.timestamp);

   //    const diff = bTime.diff(aTime);
   //    console.log(diff, distanceBetween);

   //    //Diff => milliseconds, distance ==> metres
   //    const speed = distanceBetween / (diff / 1000);
   //}
}

module.exports = TrackPoint;
