const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
require("dotenv").config()

const database = require("./config/database")

const systemConfig = require("./config/system")

const routeAdmin = require("./routes/admin/index.route")
const route = require("./routes/client/index.route")


database.connect()
// kết nối tới database

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: false}))

app.set("views","./views");
app.set("view engine", "pug");

app.locals.prefixAdmin = systemConfig.prefixAdmin
// Khai báo biến prefixAdmin

app.use(express.static("public"))

routeAdmin(app)
route(app)

app.listen(port ,() => {
     console.log(`Da truy cap vao http://localhost:${port}/admin/product`)
})
