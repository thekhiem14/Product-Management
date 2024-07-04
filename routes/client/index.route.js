const productRoutes = require("./product.route")
const homeRoutes = require("./home.route")
module.exports = (app) => {
     app.get("/", (req,res) => {
          res.render("client/pages/home/index", { // Gọi file Pug
               title: "Trang chu",
               message: "Xin chao cac ban"
          } ) 
     })
     
     app.use("/product", productRoutes)
     app.use("/home", homeRoutes)
}

