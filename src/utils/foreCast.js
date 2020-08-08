const request = require("request");

const foreCast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=44ec0272ceca0f660f19f7016c160b28&query=${latitude},${longtitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      console.log(body.error);
      callback("Unable to find that location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions, humidity } = body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It's is currently ${temperature} degrees outside, but it feels like ${feelslike}. The humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = foreCast;
