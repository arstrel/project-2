const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const passport = require("passport");
const uploadMagic = require('../config/cloudinary-setup');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/profile', (req, res, next) => {
  if(req.isAuthenticated()) {
    res.render('profile')
  } else {
    req.flash('error', 'Login to view profile page');
    res.redirect('/')
  }
})
router.get('/signup', (req, res, next) => {
  res.render('signup')
})
router.get('/login', (req, res, next) => {
  res.render('login')
})
router.get('/calculator', (req, res, next) => {
  res.render('calculator')
})
router.get('/report/edit', (req, res, next) => {
  res.render('editReport')
})
router.get('/profile/edit', (req, res, next) => {
  if(req.isAuthenticated()) {
    res.render('editProfile')
  } else {
    req.flash('error', "Log in first to edit your profile");
    res.redirect('/');
  }
})
router.get('/report/detailed', (req, res, next) => {
  res.render('reportDetailed')
})

//signup button
router.post('/signup',  uploadMagic.single('image'), (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let img;
  if(req.file) { img = req.file.url;}
  else { img = 'http://res.cloudinary.com/ironhack55/image/upload/v1563145901/employees-profiles/default-image.png.png'}
  let position = req.body.position;
  let password = req.body.password;

  if (name === "" || password === "" || email === "") {
    req.flash('error', "Please fill in all the fields")
    res.redirect("/signup");
  }
  User.findOne({ username: name }).then(user => {
    if (user !== null) {
      req.flash('error', "The username already exists")
      res.redirect("/signup");
    }
  });
  
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    User.create({
      username: email,
      name: name,
      image: img,
      position: position,
      password: hashedPassword
    })
    .then((newlyCreated) => {
      console.log(newlyCreated);
      req.login(newlyCreated, () => {
        req.flash('success', `${newlyCreated.username} user profile created successfully`)
        res.redirect('/profile')
      })
    })
    .catch(err => {
      next(err)
    })
    
    
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: 'Email or password not correct',
    successFlash: `Logged in successfully`,
    passReqToCallback: true
  })
);

router.post('/logout', (req, res, next)=> {
  req.logout();
  req.flash('success', 'Logged out successfully');
  res.redirect('/')
});


router.post('/profile/edit/:id',  uploadMagic.single('image'), (req, res, next) => {
  let name = req.body.name;
  let username = req.body.email;
  let img;
  if(req.file) {img = req.file.url}
  else {img = req.user.image};
  let userID = req.params.id;
  let position = req.body.position;
  let newPasswordString = req.body.password;
 
  User.findByIdAndUpdate(userID, {
    username: username,
    name: name,
    image: img,
    position: position,
  })
  .then((updatedUser) => {
    updatedUser.setPassword(newPasswordString, function(){
    updatedUser.save();
      req.flash('success', "User info saved");
      res.redirect('/profile')
    });
  })
  .catch(err => {
    req.flash('error', "Error editting user info")
    next(err);
  })
})

router.post('/profile/delete/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
  .then(()=>{
    req.flash('success', 'Profile deleted');
      res.redirect('/');
  })
  .catch((err)=>{
      next(err);
  })
})







module.exports = router;
