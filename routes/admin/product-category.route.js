const express = require("express")
const multer = require('multer')
const router = express.Router()

const upload = multer()

const controller = require("../../controllers/admin/product-category.controller")
const validate = require("../../validates/admin/product-category.validate")

const uploadCloud = require("../../middlewares/admin/upLoadCloud.middleware")

router.get("/", controller.index)

router.get("/create", controller.create)

router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.creatPost,
    controller.createPost
)
module.exports = router
