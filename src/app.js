const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/foreCast");

const app = express();

// Define paths fr Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, resp) => {
  resp.render("index", {
    title: "Weather",
    name: "Prashant Sunwar",
  });
});

app.get("/about", (req, resp) => {
  resp.render("about", {
    title: "About Me",
    name: "Prashant Sunwar",
  });
});

app.get("/help", (req, resp) => {
  resp.render("help", {
    title: "Help Page",
    helpText: "Help is on the way",
    name: "Prashant Sunwar",
  });
});

app.get("/weather", (req, resp) => {
  if (!req.query.address) {
    return resp.send({
      error: "You must provide an address",
    });
  }
  geoCode(req.query.address, (error, data) => {
    if (error) {
      return resp.send({
        error: error,
      });
    }
    const { latitude, longitude, location } = data || {};
    foreCast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return resp.send({
          error: error,
        });
      }
      resp.send({
        forecast: foreCastData,
        location,
        address: req.query.address,
      });
    });
  });
  // resp.send({ address: req.query.address, forecast: 22, location: "Lucknow" });
});

app.get("/help/*", (req, resp) => {
  resp.render("404", {
    title: "Error",
    errorMessage: "Help not found",
    name: "Prashant Sunwar",
  });
});

// '*' means match anything that didn't match
app.get("*", (req, resp) => {
  resp.render("404", {
    title: "Error",
    errorMessage: "Page not found",
    name: "Prashant Sunwar",
  });
});

// App is listening on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
