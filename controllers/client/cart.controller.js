const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")

const productHelper = require("../../helper/product") 
// [GET] /cart
module.exports.index = async (req,res) => {
  const cartId = req.cookies.cartId

  const cart = await Cart.findOne({
    _id: cartId
  })

  if(cart.products.length > 0){
    for(const item of cart.products){
      const productId = item.product_id

      item.productInfo = await Product.findOne({
        _id: productId
      }).select("title thumbnail slug price discountPercentage")
      item.productInfo.priceNew = productHelper.priceNewProduct(item.productInfo)
    }
  } 

  cart.totalPrice = cart.products.reduce((sum, item) => sum + item.quantity * item.productInfo.priceNew, 0)

  res.render("client/pages/cart/index", {
    pageTitle: "Trang chủ",
    cartDetail: cart
}) 
}

// POST /cart/add/:productId
module.exports.add = async (req,res) => {
  const productId = req.params.productId
  const quantity = parseInt(req.body.quantity)
  const cartId = req.cookies.cartId

  const objectCart = {
    product_id: productId,
    quantity: quantity
  }

  const cart = await Cart.findOne({
    _id: cartId
  }) 
  const existProductInCart = cart.products.find(item => item.product_id == productId)

  if(existProductInCart){
    await Cart.updateOne({
      _id: cartId,
      "products.product_id": productId
    }, {
      $set: {
        "products.$.quantity": quantity + existProductInCart.quantity
      }
    })
  }
  else {
    await Cart.updateOne(
      {
        _id: cartId
      },
      {
        $push: {products: objectCart}
      }
    )
  }
  req.flash("success", "Đã thêm sản phẩm vào giỏ hàng")
  res.redirect("back")
}

// [GET] /cart/delete/productId
module.exports.delete = async (req,res) => {
  const cartId = req.cookies.cartId
  const productId = req.params.productId

  const cart = await Cart.findOne({_id: cartId})

  req.flash("success", "Xóa sản phẩm thành công")
  res.redirect("back")
}

// [GET] /cart//update/:productId/:quantity
module.exports.update = async (req,res) => {
  const cartId = req.cookies.cartId
  const productId = req.params.productId
  const quantity = req.params.quantity

  const cart = await Cart.updateOne({
    _id: cartId,
    "products.product_id": productId
  }, 
  {
    $set: {
    "products.$.quantity": quantity
  }}
  )

  req.flash("success", "Cập nhật số lượng sản phẩm thành công")
  res.redirect("back")
}
