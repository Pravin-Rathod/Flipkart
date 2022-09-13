const express = require("express")
const router = express.Router()
require("../../db/connection/conn")

const Cart = require("../../db/models/cartModel")
const authenticateUser = require("../middleware/authenticateUser")

router.post("/cartProductDelete",authenticateUser,async (req,res)=>{
    try{
        const {productId} = req.body
        const userId = req.userId

        const deleteProduct = await Cart.updateOne({userId:userId},{$pull:{products:{productId:productId}}})
        
        if(deleteProduct)
            res.status(201).json({status:201,message:"Product Deleted"})
        else
            res.status(401).json({status:401,message:"Product Delete Failed"})
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router