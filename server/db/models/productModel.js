const mongoose = require("mongoose")


const productModel = new mongoose.Schema({
    productType: {
        type: String,
        required: true
    }, productId: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true
    },
    productRating: {
        type: Number,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDPrice: {
        type: Number,
        required: true
    },
    productDiscount: {
        type: Number,
        required: true
    },

    sellerProductStock: {
        type: Number,
        required: true
    },
    // productFeedback:[
    //     {
    //         userId:{
    //             type: String,
    //             required: true
    //         },
    //         userFeedback:{
    //             type: String,
    //             required: true
    //         }
    //     }
    // ],
})



productModel.methods.productUpdate = async function (productType, productId, productImage, productName, productRating, productDesc, productPrice, productDPrice, productDiscount, sellerProductStock) {
    try {
        this.productType = productType
        this.productId = productId
        this.productImage = productImage
        this.productName = productName
        this.productRating = productRating
        this.productDesc = productDesc
        this.productPrice = productPrice
        this.productDPrice = productDPrice
        this.productDiscount = productDiscount
        this.sellerProductStock = sellerProductStock
        await this.save()
        return 201
    }
    catch (err) {
        console.log(err)
    }
}

const Product = mongoose.model('PRODUCT', productModel)

module.exports = Product