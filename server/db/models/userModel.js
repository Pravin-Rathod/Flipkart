const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    address:{
        type:String,
    }
})

userModel.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
    }
    next();
})

userModel.methods.generateSessionToken = async function(){
    try{
         let sessionToken = jwt.sign({_id:this._id},process.env.TOKEN_KEY)
         this.token=sessionToken
         await this.save()
         return sessionToken
    }
    catch(err)
    {
        console.log(err)
    }
}

userModel.methods.userUpdate = async function(name,number,address){
    try{
        this.name = name
        this.number = number
        this.address = address
        await this.save()
        return 201
    }
    catch(err){
        console.log(err)
    }
}

const User = mongoose.model('USER',userModel)

module.exports = User