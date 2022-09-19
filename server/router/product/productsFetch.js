const { json } = require("body-parser")
const express = require("express")
const router = express.Router()
require("../../db/connection/conn")

const Product = require("../../db/models/productModel")

router.post("/productsFetch",async (req, res) => {
    try {        
        const products = await Product.find()
        if(products)
            res.send(products)
    }
    catch (err) {
        res.status(401).send("Fetching Products Failed")
        console.log(err)
    }
})

router.post("/productsFetchType",async (req, res) => {
    try {        
        const {productType} = req.body
        const products = await Product.find({productType:productType})
        if(products)
            res.send(products)
    }
    catch (err) {
        res.status(401).send("Fetching Products Failed")
        console.log(err)
    }
})



router.post("/productFetch",async (req, res) => {
    const {productId} = req.body
    try {
        const product = await Product.findOne({productId:productId})
        
        if(product)
            res.send(product)
        else
            return res.status(401).json({ status: 401, message: "Product Does Not Exist" })
    }
    catch (err) {
        res.status(401).send("Fetching Product Failed")
        console.log(err)
    }
})

module.exports = router 