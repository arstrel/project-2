const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Check = require("../models/Check");
const Report = require("../models/Report");
const Setup = require("../models/Setup");
const flash = require("connect-flash");

router.post("/setup-save", (req, res, next) => {
  Setup.create({
    eventTipPercentage: req.body.eventTipPercentage,
    tipoutPercentage: req.body.tipoutPercentage,
    tipoutfoodRunnerPercentage: req.body.tipoutfoodRunnerPercentage,
    doTipFoodRunner: req.body.doTipFoodRunner,
    doTipBartender: req.body.doTipBartender,
    numberOfServers: req.body.numberOfServers
  })
  .then((setupObject) => {
    console.log(`Setup created: ${setupObject}`);
    Report.create({
      config: setupObject._id

    })
    .then((report) => {
      console.log(`Report createed: ${report}`);
      res.send(report);
    })
    .catch(err => {
      next(err);
    });
  })
  .catch(err => {
    next(err);
  });
});

router.post("/check-save", (req, res, next) => {
  Check.create(req.body)
    .then(check => {
      console.log(`Check created: ${check} `);
      res.status(200);
      //axios on the front end never calls .then without .send here
      res.send(check);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
