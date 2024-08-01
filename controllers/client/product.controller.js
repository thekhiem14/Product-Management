const Product = require("../../models/product.model")
// const ProductCategory = require("../../models/product-category.model");
const productsHelper = require("../../helper/product");
// const productsCategoryHelper = require("../../helpers/products-category");
// [GET] /product
module.exports.index = async (req,res) => {
     const products = await Product.find({
          status: "active",
          deleted: false
     }).sort({position: "desc"});
     
     const newProducts = productsHelper.priceNewProducts(products)
     console.log(newProducts)
     res.render("client/pages/product/index", {
          pageTitle: "Danh sách sản phẩm",
          products: newProducts,
     });
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
