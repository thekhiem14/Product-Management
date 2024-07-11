const Product = require("../../models/product.model")
// [GET] /product
module.exports.index = async (req,res) => {
     let find = {
          deleted: false
     }

     const product = await Product.find(find).sort({ position: "desc" });

     res.render("client/pages/product/index", {
          title: "Trang san pham",
          message: "Trang san pham",
          product: product
     })
     // gọi file pug
}
// [GET] /product/:slug
module.exports.detail = async (req,res) => {
     const find = {
          deleted: false,
          slug: req.params.slug,
          status: "active"
     }

     const product = await Product.findOne(find) 
     res.render("client/pages/product/detail", {
          title: "Trang san pham",
          message: "Trang san pham",
          product: product
     })
}
