const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile', (req, res, next) => {
  res.render('profile')
})
router.get('/signin', (req, res, next) => {
  res.render('signin')
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
  res.render('editProfile')
})


module.exports = router;
