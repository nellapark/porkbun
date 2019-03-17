// Load node modules
const express = require('express');
const cron = require('cron');
const scraper = require('./scripts/scraper.js');

const app = express();
const CronJob = cron.CronJob;

// Express configs (have to use views/ directory to use res.render)
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + "/dist"));

// GET request handling
app.get('/', function(req, res) {
  res.render("index.html");
});

// Default
app.get('/*', function(req, res) {
  res.send("Page not found");
});

// Start server
const port = process.argv[2] ? process.argv[2] : 3000;
app.listen(port, function() {
  // const job = new CronJob('0 0 0 * * *', function() {
  //   console.log('Code for running every midnight');
  // }, null, false, 'America/New_York');
  // job.start();
  scraper.scrape();
  console.log("Listening on %d", port);
});
