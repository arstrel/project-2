const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Report = require("../models/Report");
const Check = require("../models/Check");
const Setup = require("../models/Setup");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const passport = require("passport");
const uploadMagic = require("../config/cloudinary-setup");
const moment = require("moment");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/profile", (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.position == "manager") {
      Report.find()
        .then(reports => {
          reports.reverse();
          for (let i = 0; i < reports.length; i++) {
            reports[i].fancyTime = moment(reports[i].created_at).format("LL");
          }
          res.render("profile", { reports: reports, manager: true });
        })
        .catch(err => {
          next(err);
        });
    } else {
      User.findById(req.user._id)
        .populate("reports")
        .then(user => {
          user.reports.reverse();
          for (let i = 0; i < user.reports.length; i++) {
            user.reports[i].fancyTime = moment(
              user.reports[i].created_at
            ).format("LL");
          }
          res.render("profile", { user: user });
        })
        .catch(err => {
          next(err);
        });
    }
  } else {
    req.flash("error", "Login to view profile page");
    res.redirect("/");
  }
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});
router.get("/login", (req, res, next) => {
  res.render("login");
});
router.get("/calculator", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("calculator", { logged: true });
  } else {
    res.render("calculator", { logged: false });
  }
});
router.get("/report/edit/:id", (req, res, next) => {
  Report.findById(req.params.id)
    .then(report => {
      res.render("editReport", {
        report: report,
        yay: "Worry not. Edits will be saved separate from the original report"
      });
    })
    .catch(err => {
      req.flash("error", "Something went wrong fetching report to edit");
      res.redirect("/report/detailed/" + req.params.id);
    });
});

router.post("/report/save-edited/:id", (req, res, next) => {
  let reportId = req.params.id;
  let sales = req.body.editedSales;
  let totalAutoGrat = req.body.editedRegAutoGrat;
  let tips = req.body.editedTips;
  let tipoutBartender = req.body.editedTipoutBartender;
  let tipoutFoodRunner = req.body.editedTipoutFoodRunner;
  let reportedTips = req.body.editedReportedTips;
  let totalTipoutBartender = req.body.editedTotalTipoutBartender;
  let totalTipoutFoodRunner = req.body.editedTotalTipoutFoodRunner;
  let takeHome = req.body.editedTakeHome;

  Report.findByIdAndUpdate(reportId, {
    $set: {
      "edited.sales": sales,
      "edited.totalAutoGrat": totalAutoGrat,
      "edited.tips": tips,
      "edited.tipoutBartender": tipoutBartender,
      "edited.tipoutFoodRunner": tipoutFoodRunner,
      "edited.reportedTips": reportedTips,
      "edited.totalTipoutBartender": totalTipoutBartender,
      "edited.totalTipoutFoodRunner": totalTipoutFoodRunner,
      "edited.takeHome": takeHome
    }
  })
    .then(() => {
      req.flash("success", "Report edited successfully");
      res.redirect("/report/detailed/" + reportId);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/profile/edit", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("editProfile");
  } else {
    req.flash("error", "Log in first to edit your profile");
    res.redirect("/");
  }
});
router.get("/report/detailed/:id", (req, res, next) => {
  if (req.isAuthenticated()) {
    Report.findById(req.params.id)
      .then(report => {
        res.render("reportDetailed", {
          report: report,
          yay: "Here is your report"
        });
      })
      .catch(err => {
        res.flash("error", "Cannot fetch the report");
        res.redirect("/profile");
      });
  } else {
    req.flash("error", "Log in first to edit your profile");
    res.redirect("/");
  }
});

router.post("/report/delete/:id", (req, res, next) => {
  if (req.isAuthenticated()) {
    Report.findByIdAndRemove(req.params.id)
      .then(() => {
        req.flash("success", "Report deleted");
        res.redirect("/profile");
      })
      .catch(err => {
        req.flash("error", "Cannot fetch the report");
        res.redirect("/profile");
      });
  } else {
    req.flash("error", "Log in first to edit your profile");
    res.redirect("/");
  }
});

//signup button
router.post("/signup", uploadMagic.single("image"), (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let img;
  if (req.file) {
    img = req.file.url;
  } else {
    img =
      "http://res.cloudinary.com/ironhack55/image/upload/v1563145901/employees-profiles/default-image.png.png";
  }
  let position = req.body.position;
  let password = req.body.password;

  if (name === "" || password === "" || email === "") {
    req.flash("error", "Please fill in all the fields");
    res.redirect("/signup");
  }
  User.findOne({ username: email }).then(user => {
    if (user !== null) {
      req.flash("error", "The username already exists");
      res.redirect("/signup");
    }
  });
  User.register(
    new User({
      username: email,
      name: name,
      image: img,
      position: position
    }),
    req.body.password,
    function(err, newlyCreated) {
      if (err) {
        console.log("error while user register!", err);
        return next(err);
      }
      req.login(newlyCreated, () => {
        req.flash(
          "success",
          `${newlyCreated.username} user profile created successfully`
        );
        res.redirect("/profile");
      });
    }
  );
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: "Email or password not correct",
    successFlash: `Logged in successfully`,
    passReqToCallback: true
  })
);

router.post("/logout", (req, res, next) => {
  req.logout();
  req.flash("success", "Logged out successfully");
  res.redirect("/");
});

router.post(
  "/profile/edit/:id",
  uploadMagic.single("image"),
  (req, res, next) => {
    let name = req.body.name;
    let username = req.body.email;
    let img;
    if (req.file) {
      img = req.file.url;
    } else {
      img = req.user.image;
    }
    let userID = req.params.id;
    let newPasswordString = req.body.password;

    User.findByIdAndUpdate(userID, {
      username: username,
      name: name,
      image: img,
    })
      .then(updatedUser => {
        updatedUser.setPassword(newPasswordString, function() {
          updatedUser.save();
          req.flash("success", "User info saved");
          res.redirect("/profile");
        });
      })
      .catch(err => {
        req.flash("error", "Error editting user info");
        next(err);
      });
  }
);

router.post("/profile/delete/:id", (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      req.flash("success", "Profile deleted");
      res.redirect("/");
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
