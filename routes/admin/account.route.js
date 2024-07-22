const express = require("express");
const router = express.Router();
const multer = require('multer')

const upload = multer()

const controller = require("../../controllers/admin/account.controller")


const validate = require("../../validates/admin/account.validate")

const uploadCloud = require("../../middlewares/admin/upLoadCloud.middleware")
router.get("/", controller.index)

router.get("/create", controller.create)


router.post("/create", 
  upload.single("avatar"),
  uploadCloud.upload,
  validate.creatPost,
  controller.createPost
)

module.exports = router;