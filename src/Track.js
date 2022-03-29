class Track {
  constructor(trackPoints) {
    this.trackPoints = trackPoints;
  }

  /**
   * @returns {number} Total distance in metres
   */
  totalDistance() {
    return this.trackPoints.reduce((acc, point, idx, arr) => {
      if (idx === 0 || idx === arr.length-1) return acc;
      const between = point.distanceFromPoint(arr[idx+1])
      acc += between;
      return acc;
    }, 0);
  }
}

module.exports = Track;
