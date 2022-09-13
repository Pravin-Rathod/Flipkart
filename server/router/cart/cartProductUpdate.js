const express = require("express")
const router = express.Router()
require("../../db/connection/conn")

const Cart = require("../../db/models/cartModel")
const authenticateUser = require("../middleware/authenticateUser")



router.post("/cartProductUpdate", authenticateUser, async(req, res) => {
    try{
        const userId = req.userId
        const {productId,productQuantity} = req.body

        const productUpdate = await Cart.updateOne({userId:userId,products:{$elemMatch:{productId:productId}}},{$set:{"products.$.productQuantity":productQuantity}})
        const data=await Cart.find({userId:userId})

        if(productUpdate)
            res.status(201).json({status:404,message:"Product Updated"})
        else
            res.status(404).json({status:404,message:"Product Update Failed"})
            
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router