const express = require("express")
const productsRoutes = require("./routes/products.routes")
const cartsRoutes = require("./routes/carts.routes")

const app = express()
const Port = 8080
const API_PREFIX = "api"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`/${API_PREFIX}/products`, productsRoutes)

app.use(`/${API_PREFIX}/carts`, cartsRoutes)

app.listen(Port, () => {
    console.log("Server up and running")
})