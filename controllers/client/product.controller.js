// [GET] /product
const Product = require("../../models/product.model")

module.exports.index = async (req,res) => {
     const product = await Product.find({});

     console.log(product);

     res.render("client/pages/product/index", {
          title: "Trang san pham",
          message: "Trang san pham",
          product: product
     })
     // gọi file pug
}
