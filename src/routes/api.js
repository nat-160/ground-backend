// Example routes/api.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// GET /api/
router.get("/", controller.default);

// POST /api/new-message
router.post("/new-message", controller.newMessage);

// GET /api/user/:username
router.get("/user/:username", controller.getUserMessages);

// POST /api/home
router.post("/home", controller.getUserPage);

module.exports = router;
