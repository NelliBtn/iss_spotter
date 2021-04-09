const request = require('request-promise-native');

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json')
};

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`)
};

const fetchISSFlyOverTimes = function (body) {
  const coords = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`)
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then (fetchCoordsByIP)
    .then (fetchISSFlyOverTimes)
    .then ((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };