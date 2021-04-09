const request = require("request");

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', // use request to fetch IP address from JSON API
    (error, response, data) => {
      if (error) return callback(error, null); // invalid domain, user is offline, etc
      if (response.statusCode !== 200) { // if non-200 status, assume server error
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      } 
      const ip = JSON.parse(data).ip;
      callback(null, ip)
  })
}

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`,
    (error, response, data) => {
      if (error) return callback(error, null);
      if (response.statusCode !== 200) return callback(Error(`Status code ${response.statusCode}`));
      const { latitude, longitude } = JSON.parse(data);
      callback(null, { latitude, longitude })
    });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, data) => {
      if (error) return callback(error, null);
      if (response.statusCode !== 200) return callback(Error(`Status code ${response.statusCode}`));
      const flyOverTimes = JSON.parse(data).response;
      callback(null, flyOverTimes)
  })
};


const nextISSTimesForMyLocation = function(callback) {
   fetchMyIP ((error, ip) => {
    if (error) return callback(Error(`It didn\'t work: ${error}`), null)
    fetchCoordsByIP (ip, (error, coords) => {
      if (error) return callback(Error(`It didn\'t work: ${error}`), null)
      fetchISSFlyOverTimes (coords, (error, flyOverTimes) => {
        if (error) return callback(Error(`It didn\'t work: ${error}`), null)
        callback(null, flyOverTimes)
      })
    })
  })
}

module.exports = { nextISSTimesForMyLocation };