const categoryMiddleware = require('../../middlewares/client/category.middleware')
const cartMiddleware = require('../../middlewares/client/cart.middleware')
const userMiddleware = require('../../middlewares/client/user.middleware')
const settingMiddleware = require('../../middlewares/client/setting.middleware')

const productRoutes = require("./product.route")
const homeRoutes = require("./home.route")
const searchRoutes = require("./search.route")
const cartRoutes = require("./cart.route")
const userRoutes = require("./user.route")
module.exports = (app) => {
     app.use(categoryMiddleware.category)
     app.use(cartMiddleware.cartId)
     app.use(userMiddleware.infoUser)
     app.use(settingMiddleware.logo)
     // Mọi route đều chứa categoryMiddleware.category

     app.use("/", homeRoutes)
     app.use("/product", productRoutes)
     app.use("/search", searchRoutes)
     app.use("/cart", cartRoutes)
     app.use("/user", userRoutes)
}

