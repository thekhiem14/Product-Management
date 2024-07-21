const systemConfig = require("../../config/system")

const dashboardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route")
const productCategoryRoutes = require("./product-category.route")
const roleRoutes = require("./role.route")

module.exports = (app) => {
     const PATH_ADMIN = systemConfig.prefixAdmin

     app.use(PATH_ADMIN + "/dashboard", dashboardRoutes)
     app.use(PATH_ADMIN + "/product", productRoutes)
     app.use(PATH_ADMIN + "/product-category", productCategoryRoutes)
     app.use(PATH_ADMIN + "/role", roleRoutes)

}

