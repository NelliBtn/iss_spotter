const { nextISSTimesForMyLocation } = require('./iss');


passTimesTranslate = function(passTimes) {
  for (let pass of passTimes) {
    let date = new Date(pass.risetime)
    date.setUTCSeconds(pass.risetime);
    const seconds = pass.duration;
    console.log(`Next pass at ${date} for ${seconds} seconds!`)
  }
}

// Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  return passTimesTranslate(passTimes);
});