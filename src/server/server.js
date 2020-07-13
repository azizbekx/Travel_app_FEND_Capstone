// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
const cors = require("cors");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(express.static("dist"));
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// Spin up the server
let projectData = {};
const port = 4000;
// Callback to debug
const server = app.listen(port, listening);

function listening() {
  console.log("server running...");
  console.log(`run on localhost:${port}`);
}
app.get("/", function (req, res) {
  res.sendFile(path.resolve('dist/index.html'))
  // res.sendFile(path.resolve("src/client/views/index.html"));

});

// Callback function to complete GET '/all'
app.get("/all", (req, res) => {
  res.send(projectData);
 
});

// Callback function to complete PUT '/addWeatherData'
app.post("/addData", (request, response) => {
  projectData.weather = request.body.weather;
  projectData.image = request.body.image;
  projectData.locationData= request.body.locationData;
  projectData.departing = request.body.departing;
  response.end();

});

