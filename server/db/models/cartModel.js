const mongoose = require("mongoose")


const cartModel = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    products:[
        {
            productId:{
                type:String,
                required:true
            },
            productQuantity:{
                type:Number,
                required:true
            }
        }
    ]
})


cartModel.methods.addToCurrCart = async function(product){
    try{
        this.products = this.products.concat(product)   
        await this.save()
        return 201
    }
    catch(err){
        console.log(err)
    }
}

const Cart = mongoose.model('CART',cartModel)

module.exports = Cart