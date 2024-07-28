const express = require("express");
const multer = require('multer')
const router = express.Router();

const upload = multer()

const uploadCloud = require("../../middlewares/admin/upLoadCloud.middleware")
const controller = require("../../controllers/admin/my-account.controller")

router.get("/", controller.index)

router.get("/edit", controller.edit)

router.patch("/edit", uploadCloud.upload, upload.single('avatar'), controller.editPatch,)

module.exports = router;