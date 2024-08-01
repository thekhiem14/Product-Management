const Cart = require("../../models/cart.model")

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