const jwt = require("jsonwebtoken")
const User = require("../../db/models/userModel")


const authenticateUser= async(req,res,next)=>{

    try{
        const token = req.cookies.flipkart
    
        const hashsedToken = jwt.verify(token,process.env.TOKEN_KEY)

        const verifyUser = await User.findOne({_id:hashsedToken._id,"token":token})

        req.token = token
        req.user = verifyUser
        req.userId = verifyUser._id
        
        next()
    }
    catch(err){
        res.status(401).send("Unauthorized User")
        console.log(err)
    }
}


module.exports  = authenticateUser  