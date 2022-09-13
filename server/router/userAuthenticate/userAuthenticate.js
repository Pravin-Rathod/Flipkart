const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../../db/models/userModel")
require("../../db/connection/conn")

router.post("/userAuthenticate",async(req, res) => {
    try{
        const token = req.cookies.flipkart
        const hashedToken = jwt.verify(token,process.env.TOKEN_KEY)
        const verifyUser = await User.findOne({_id:hashedToken._id,token:token})
        
        if(verifyUser)
        {
            return res.status(201).json({status:201,message:"User Verified"})
        }
        else
        {
            return res.status(401).json({status:401,message:"Unauthorized User"})
        }
        
    }
    catch(err){
        res.status(401).send("Unauthorized User")
        console.log(err)
    }
})

module.exports = router