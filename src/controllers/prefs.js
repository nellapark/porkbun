// Load modules
const express = require('express');
const db = require('../scripts/db/db.js');
const auth = require('./auth.js');

// Router for preferences
const router = express.Router();

// Display the preferences page if user is logged in
router.get('/', auth.isLoggedIn, async (req, res) => {
  res.render('prefs', {
    netid: req.session.netid,
    prefs: await db.getDishPref(req.session.netid)
  });
});
  
// Insert dish into preferences
router.post('/', auth.isLoggedIn, async (req, res) => {
  if (req.body.dish)
    await db.addDishPref(req.session.netid, req.body.dish);
  res.redirect('/prefs');
});

// Insert location, day, and meal time into preferences
router.post('/locs', auth.isLoggedIn, async (req, res) => {
  if (req.body.dhall) {
    let dhall = req.body.dhall;
    let meal  = req.body.meal;
    let day   = req.body.day;
    await db.addLocationPref(req.session.netid, dhall, meal, day);
  }
  res.redirect('/prefs');
});

// Removes dish (dish passed as query parameter)
router.get('/remove', auth.isLoggedIn, async (req, res) => {
  if (req.query.dish)
    await db.removeDishPref(req.session.netid, req.query.dish);
  res.redirect('/prefs');
});

module.exports.router = router;