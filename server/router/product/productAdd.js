const express = require("express")
const Product = require("../../db/models/productModel")
const router = express.Router()
require("../../db/connection/conn")

router.post("/productAdd", async (req, res) => {
    console.log(req.body)
    const { productType, productId, productImage, productName, productRating, productDesc, productPrice, productDPrice, productDiscount,  sellerProductStock }  = req.body
    try {
        const isProductExist = await Product.findOne({ productId:productId })

        if (isProductExist) {
            return res.status(400).json({ status: 400, message: "product Already Exist" })
        }
        else {
            const newProduct = new Product({ productType, productId, productImage, productName, productRating, productDesc, productPrice, productDPrice, productDiscount, sellerProductStock})

            const productAddStatus  = await newProduct.save()

            if (productAddStatus)
                return res.status(201).json({ status: 201, message: "product Registration Done" })
            else
                return res.status(501).json({ status: 501, message: "product Registration Failed" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(501).json({ status: 501, message: err.message })
    }
})

module.exports = router;