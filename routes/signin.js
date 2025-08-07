const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();  // ここで認証判定
  //const userId = req.session.userid;
  //const isAuth = Boolean(userId);
  const messages = {
    error: req.flash('error')
  };
  res.render("signin", {
    title: "Sign in",
    isAuth: isAuth,
    messages: messages,
  });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/calendar',
    failureRedirect: '/signin',
    failureFlash: true,
  }
));

module.exports = router;