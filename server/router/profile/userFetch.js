const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = require("../../db/models/userModel")
require("../../db/connection/conn")

const authenticateUser = require("../middleware/authenticateUser")

router.get("/userProfile",async (req, res) => {
    try{
        const token = req.cookies.flipkart
        const hashedToken = jwt.verify(token,process.env.TOKEN_KEY)

        const verifyUser = await User.findOne({_id:hashedToken._id})
        res.send(verifyUser)
    }
    catch(err){
        res.status(401).send("Unauthorized User")
        console.log(err)
    }
})

module.exports = router