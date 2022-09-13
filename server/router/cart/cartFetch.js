const express = require("express")
const router = express.Router()
require("../../db/connection/conn")

const Cart = require("../../db/models/cartModel")
const authenticateUser = require("../middleware/authenticateUser")

router.post("/cartFetch", authenticateUser, async(req, res) => {
    try{
        const userId = req.userId
        const isCartExist = await Cart.findOne({userId:userId})

        if(isCartExist)
            res.send(isCartExist.products)
        else
            res.status(404).json({status:404,message:"User Cart Is Empty"})
            
    }
    catch(err){
        console.log(err)
    }
})

router.post("/cartItemCount", authenticateUser, async(req, res) => {
    try{
        const userId = req.userId
        const isCartExist = await Cart.findOne({userId:userId})
        const  d = isCartExist.products
        return res.json({count:d.length})
    }   
    catch(err){
        console.log(err)
    }
})

module.exports = router