const Product = require("../../models/product.model")

const productsHelper = require('../../helper/product')
// [GET] /search
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword

  let newProducts = []

  if (keyword) {
    const regex = new RegExp(keyword, "i")
    const products = await Product.find({
      title: regex,
      deleted: false,
      status: "active",
    })
    console.log(products)
    newProducts = productsHelper.priceNewProducts(products)
  }

  res.render("client/pages/search/index", {
    pageTitle: "Kết quả tìm kiếm",
    products: newProducts
  });
}