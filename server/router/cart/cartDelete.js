const express = require("express")
const router = express.Router()
require("../../db/connection/conn")

const Cart = require("../../db/models/cartModel")
const authenticateUser = require("../middleware/authenticateUser")

router.post("/cartDelete", authenticateUser, async (req, res) => {
    try {
        const {cartId} = req.body

        const isCartExist = await Cart.findOne({_id:cartId});
        if(isCartExist){
            const cartDelete = await Cart.deleteOne({_id:cartId});
            if(cartDelete)
                res.status(201).json({status:201,message:"cart deleted"})
            else
                res.status(401).json({status:401,message:"Deleting cart failed"})
        }
        else{
            res.status(401).json({status:401,message:"No cart available"})
        }
    }
    catch (err) {
        // res.status(400).json({ status: 400, message: "Login Failed" })
        console.log(err)
    }
})

module.exports = router