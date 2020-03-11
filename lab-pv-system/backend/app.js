const express = require("express");
const bodyParser = require("body-parser");

const EgcrInfo = require('./models/egcr-info');
const Lab = require('./models/lab');
const MachineInfo = require('./models/machine-info');
const PvInfo = require('./models/pv-info');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// end points for add data
app.post("/api/egcr-info/add", (req, res, next) => {
  const lat = req.body.lat;
  const lon = req.body.lon;

  new EgcrInfo({
    lat: lat,
    lon: lon
  }).save();

  res.status(201).json({
    message: 'EGCR Info added successfully'
  });
});

app.post("/api/lab/add", (req, res, next) => {

  new Lab({
      lat: req.body.lat,
      lon: req.body.lon,
      city: req.body.city,
      area: req.body.area,
      phase: req.body.phase,
      st: req.body.st,
      s_st: req.body.s_st,
      building: req.body.building,
      floor: req.body.floor
  }).save();
  
  res.status(201).json({
    message: 'Lab added successfully'
  });
});

app.post("/api/machine-info/add", (req, res, next) => {

  new MachineInfo({
    lab_id: req.body.lab_id,
    pr1: req.body.pr1,
    pr2: req.body.pr2,
    dr1: req.body.dr1,
    dr2: req.body.dr2,
    ss: req.body.ss
  }).save();
  
  res.status(201).json({
    message: 'Machine info added successfully'
  });
});

app.post("/api/pv-info/add", (req, res, next) => {

  new PvInfo({
    lat: req.body.lat,
    lon: req.body.lon,
    lab_id: req.body.lab_id,
    lab_order: req.body.lab_order
  }).save();
  
  res.status(201).json({
    message: 'Pv info added successfully'
  });
});
//-------------------------------------------------------


// Method to update pv-info
app.post("/api/pv-info/update", (req, res, next) => {

  console.log("update called");
  const pvItem = {
      "lat": req.body.lat,
      "lon": req.body.lon,
      "lab_id": req.body.lab_id,
      "lab_order": req.body.lab_order,
      "pv_id": req.body.pv_id
  };

  console.log(pvItem);

  PvInfo.findOneAndUpdate({"pv_id": req.body.pv_id}, pvItem)
  .then(function (pv) {


    return res.status(200).json({
      status: 200,
      data: pv,
      message: "Success"
    });
  })
  .catch(function (err) {
    return res.status(400).json({
      status: 400,
      message: err.message
    });
  });
});

//-------------------------------



// get all data
app.get("/api/egcr-info", (req, res, next) => {
  
  EgcrInfo.find()
    .then(function (data) {
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Success"
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      });
    });
});


app.get("/api/lab", (req, res, next) => {
  
  Lab.find()
    .then(function (data) {
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Success"
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      });
    });
});



app.get("/api/machine-info", (req, res, next) => {
  
  MachineInfo.find()
    .then(function (data) {
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Success"
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      });
    });
});


app.get("/api/pv-info", (req, res, next) => {
  
  PvInfo.find()
    .then(function (data) {
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Success"
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      });
    });
});

module.exports = app;
