// Example routes/api.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const logincontroller = require("../controllers/loginController");

// GET /api/
router.get("/", controller.default);

// POST /api/new-message
router.post("/new-message", controller.newMessage);

// GET /api/user/:username
router.get("/user/:username", controller.getUserMessages);

// POST /api/home
router.post("/home", controller.getUserPage);

// POST /api/follow
router.post("/follow", controller.follow);

// POST /api/unfollow
router.post("/unfollow", controller.unfollow);

// POST /api/register
router.post("/register", controller.register);

// POST /api/login
router.post("/login", logincontroller.login);

// POST /api/home-test
router.post("/home-test", logincontroller.home);

// POST /api/new-test
router.post("/new-test", logincontroller.newMessage);

module.exports = router;
