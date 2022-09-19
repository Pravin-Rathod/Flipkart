const express = require("express")
const router = express.Router()
require("../../db/connection/conn")

const Cart = require("../../db/models/cartModel")
const authenticateUser = require("../middleware/authenticateUser")



router.post("/addToCart", authenticateUser, async (req, res) => {
    try {

        const userId = req.userId
        const { product } = req.body

        const isCartExist = await Cart.findOne({ userId: userId })
        if (isCartExist) {
            const updateCart = await isCartExist.addToCurrCart(product)
            if (updateCart == 201)
                return res.status(201).json({ status: 201, message: "Product Added To The Cart" })
            else
                return res.status(401).json({ status: 401, message: "Task Failed" })

        }
        else {
            const products = [product]
            const cart = new Cart({ userId, products })
            const isCartSaved = cart.save()
            res.status(201).json({ status: 200, message: "Cart created" })
        }

    }
    catch (err) {
        // res.status(400).json({ status: 400, message: "Login Failed" })
        console.log(err)
    }
})


router.post("/cartProductExist", authenticateUser, async (req, res) => {
    try {
        const { productId } = req.body
        const userId = req.userId
        const isProductExist = await Cart.find({ userId: userId, products: { $elemMatch: { productId: productId } } })

        if (isProductExist.length)
            res.status(201).json({ status: 201, message: "Product Exist" })
        else
            res.status(401).json({ status: 401, message: "Product Dont Exist" })
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router;