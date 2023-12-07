// Example routes/api.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// GET routes
router.get("/", controller.default);
router.get("/user/:username", controller.user);

// POST routes
// register(username, password)
router.post("/register", controller.register);
// login(username, password)
router.post("/login", controller.login);
// home(token)
router.post("/home", controller.home);
// new(token, message)
router.post("/new", controller.new);
// follow(token, followingName)
router.post("/follow", controller.follow);
// unfollow(token, followingName)
router.post("/unfollow", controller.unfollow);

module.exports = router;
