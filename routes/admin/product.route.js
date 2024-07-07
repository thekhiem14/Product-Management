const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller")

router.get("/", controller.product)
router.patch("/change-status/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.deleteItem)
router.get("/create", controller.creat)
router.post("/create", controller.creatPost)


module.exports = router;
