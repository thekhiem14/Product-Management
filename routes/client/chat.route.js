const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/chat.controller")
const authMiddleware = require('../../middlewares/client/auth.midleware')
router.get("/", authMiddleware.requireAuth, controller.index)

module.exports = router;