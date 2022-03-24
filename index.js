"use strict";

const xml2js = require('xml2js');
const parseTrack = require('./src/parseTrack');

module.exports = async (xmlStr) => {
  const xml = await xml2js.parseStringPromise(xmlStr);
  return parseTrack(xml.gpx.trk);
}