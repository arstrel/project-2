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


router.post('/attach-check-to-report', (req, res, next)=> {
  //attach check id to corresponding report
  Report.findByIdAndUpdate(req.body.reportId, {
    $push: { checks: req.body.checkId }
  })
  .then((report)=> {
    
    res.json({message: `Check attached to the report`})
   
  })
  .catch((error)=> {
    
    res.json({message: `Something went wrong saving check to report`})
  })
})

router.post('/save-finished-report', (req, res, next)=> {
  
  Report.findByIdAndUpdate(req.body.reportId,{
    sales: req.body.sales,
    totalAutoGrat: req.body.totalAutoGrat,
    tips: req.body.tips,
    tipoutBartender: req.body.tipoutBartender,
    tipoutFoodRunner: req.body.tipoutFoodRunner,
    reportedTips: req.body.reportedTips ,
    totalTipoutBartender: req.body.totalTipoutBartender,
    totalTipoutFoodRunner: req.body.totalTipoutFoodRunner,
    takeHome: req.body.takeHome
  })
  .then(report => {
    if(req.isAuthenticated()) {
      User.findByIdAndUpdate(req.user._id, {
        $push: { reports: req.body.reportId}
      })
      .then(()=> {
        res.json({message: `Freshly cooked report saved for ${req.user.name}`})
      })
      .catch((err)=>{
        res.json({message: `Error adding report to user ${req.user.name}`})
        next(err)
      })
    }
  })
  .catch(err => {
    res.json({message: `Error finishing the report`})
  })



})


module.exports = router;
