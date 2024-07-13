const express = require("express")
const multer = require('multer')
const router = express.Router()

const upload = multer()

const controller = require("../../controllers/admin/product.controller")
const validate = require("../../validates/admin/product.validate")

const uploadCloud = require("../../middlewares/admin/upLoadCloud.middleware")

router.get("/", controller.product)

router.patch("/change-status/:status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.delete("/delete/:id", controller.deleteItem)

router.get("/create", controller.creat)

router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.creatPost,
    controller.creatPost
)

router.get("/edit/:id", controller.edit)

router.patch("/edit/:id", upload.single('thumbnail'), validate.creatPost, uploadCloud.upload, controller.editPatch)

router.get("/detail/:id", controller.detail)

module.exports = router;
