const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser"); 

dotenv.config({ path:"./configuration/config.env"})
const PORT = process.env.PORT

require("./db/connection/conn")

app.listen(PORT, () => {
    console.log("server listening in 5000 port ...")
})

app.use(express.json())
app.use(cookieParser());
app.use(require("./router/Signup/signup"))
app.use(require("./router/Login/login"))

app.use(require("./router/userAuthenticate/userAuthenticate"))
app.use(require("./router/profile/userFetch"))
app.use(require("./router/profile/userUpdate"))

app.use(require("./router/product/productAdd"))
app.use(require("./router/product/productUpdate"))
app.use(require("./router/product/productDelete"))
app.use(require("./router/product/productsFetch"))

app.use(require("./router/cart/cartCreate"))
app.use(require("./router/cart/cartFetch"))
app.use(require("./router/cart/cartProductDelete"))
app.use(require("./router/cart/cartProductUpdate"))
app.use(require("./router/cart/cartDelete"))