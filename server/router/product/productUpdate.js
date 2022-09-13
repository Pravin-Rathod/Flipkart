const express = require("express")
const Product = require("../../db/models/productModel")
const router = express.Router()
require("../../db/connection/conn")

router.post("/productUpdate", async (req, res) => {
    console.log(req.body)
    const { productType, productId, productImage, productName, productRating, productDesc, productPrice, productDPrice, productDiscount,  sellerProductStock }  = req.body
    try {
        const isProductExist = await Product.findOne({ productId:productId })

        if (isProductExist) {
            const productUpdate = await isProductExist.productUpdate(productType, productId, productImage, productName, productRating, productDesc, productPrice, productDPrice, productDiscount,  sellerProductStock)
            if(productUpdate==201)
            {
                await isProductExist.save()
                return res.status(201).json({status:201,message:"Product Update Done"})
            }
            else{
                return res.status(400).json({status:400,message:"Product Update Failed"})
            }
        }
        else {
                return res.status(501).json({ status: 501, message: "Product Not Found" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(501).json({ status: 501, message: err.message })
    }
})

module.exports = router;