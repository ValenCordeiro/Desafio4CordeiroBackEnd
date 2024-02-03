const express = require("express")
const { engine } = require("express-handlebars")
const path = require("path")
const productsRoutes = require("./routes/products.routes")
const cartsRoutes = require("./routes/carts.routes")
const viewsRouter = require("./routes/views.router")

const app = express()
const Port = 8080
const API_PREFIX = "api"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/../public"))
app.engine("handlebars", engine())
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars")

app.use(`/${API_PREFIX}/products`, productsRoutes)

app.use(`/${API_PREFIX}/carts`, cartsRoutes)

app.use("/", viewsRouter)

app.listen(Port, () => {
    console.log("Server up and running")
})