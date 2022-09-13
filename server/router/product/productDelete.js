const { json } = require("body-parser")
const express = require("express")
const router = express.Router()
require("../../db/connection/conn")

const Product = require("../../db/models/productModel")

router.post("/productDelete",async (req, res) => {
    const {productId} = req.body
    try {
        const products = await Product.deleteOne({productId:productId})
        if(products)
            res.status(201).json({status:201,message:"Product Deleted"})
        else
            res.status(401).json({status:401,message:" Product Delete Failed"})
    }
    catch (err) {
        res.status(401).json({status:401,message:" Product Delete Failed"})
        console.log(err)
    }
})

module.exports = router