const passport = require("passport");
const LocalStrategy = require("passport-local");
const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const User = require("../models/user");
//const cookieSession = require("cookie-session");
//const secret = "secretCuisine123";
const session = require("express-session");

module.exports = function (app) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async function (username, password, done) {
    try {
      // DBからユーザーを検索
      const results = await knex("users").where({ name: username }).select("*");

      console.log("検索結果:", results);  // ← デバッグ用ログ

      if (results.length === 0) {
        console.log("ユーザーが見つかりません");
        return done(null, false, { message: "Invalid User" });
      }

      const user = results[0];

      console.log("入力パスワード:", password);
      console.log("DBのハッシュ:", user.password);

      const passwordMatch = await bcrypt.compare(password, user.password);

      console.log("一致する？", passwordMatch);

      if (passwordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invalid User" });
      }
    } catch (err) {
      console.error("ログイン処理でエラー:", err);
      return done(err);
    }
  }
));

 /* app.use(
    cookieSession({
      name: "session",
      keys: [secret],

      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  );*/

  app.use(
   session({
     secret: "your_secret_key_here", // 好きな文字列に変えてOK
     resave: false,
     saveUninitialized: false,
   })
 );

  

   app.use(passport.initialize()); // ここを追加！

  app.use(passport.initialize());
  app.use(passport.session());
};