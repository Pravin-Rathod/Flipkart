const express = require("express")
const router = express.Router()
require("../../db/connection/conn")

const User = require("../../db/models/userModel")

const authenticateUser = require("../middleware/authenticateUser")

router.post("/userUpdate",authenticateUser,async (req,res)=>{
    console.log(req.body)
    const {name,number,address} = req.body

    if(!name || !number || !address){
        return res.status(400).json({status:400,message:"Empty Field"})
    }
    
    try{    
        const isUserExist = await User.findOne({_id:req.userId})
        if(!isUserExist)
            return res.status(401).json({status:401,message:"Unauthorized User"})
        else{
            const userUpdateStatus = await isUserExist.userUpdate(name,number,address)
            if(userUpdateStatus==201)
            {
                await isUserExist.save()
                return res.status(201).json({status:201,message:"User Update Done"})
            }
            else{
                return res.status(400).json({status:400,message:"User Update Failed"})
            }
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({status:400,message:"User Update Failed"})
    }
})

module.exports = router