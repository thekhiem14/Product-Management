const express = require('express');
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const moment = require('moment')
const http = require('http')
const { Server } = require('socket.io')
require("dotenv").config()

const database = require("./config/database")

const systemConfig = require("./config/system")

const routeAdmin = require("./routes/admin/index.route")
const route = require("./routes/client/index.route")


database.connect()
// kết nối tới database

const app = express();
const port = process.env.PORT;

// SoketIO
const server = http.createServer(app)
const io = new Server(server)
global._io = io
// End SocketIO

app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: false}))

app.set("views",`${__dirname}/views`);
app.set("view engine", "pug");

// Flash
app.use(cookieParser('ABCDEFGH'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE

app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.moment = moment
// Khai báo biến prefixAdmin



app.use(express.static(`${__dirname}/public`))

// Route
routeAdmin(app)
route(app)
// app.get("*", (req, res) => {
//      res.render("client/pages/error/404", {
//           pageTitle: "404 Not Found"
//      })
// })

server.listen(port ,() => {
     console.log(`Da truy cap vao http://localhost:${port}`)
})
