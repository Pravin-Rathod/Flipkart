import React from "react";

function AddProduct() {

    const [productData, setProductData] = React.useState({
        productType: "",
        productId: "",
        productImage: "",
        productName: "",
        productRating: "",
        productDesc: "",
        productPrice: 0,
        productDiscount: 0,
        productDPrice: 0,
        sellerProductStock: "",
    })

    function handleChange(event) {
        const { name, value } = event.target
        setProductData(preProductData => {
            return ({
                ...preProductData,
                [name]: value
            })
        })

        if ([name] == "productDiscount") {
            const price = productData.productPrice - (productData.productPrice * value) / 100
            setProductData(preProductData => {
                return ({
                    ...preProductData,
                    productDPrice: parseInt(price)
                })
            })
        }
    }

    const updateItem = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch("/productAdd", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productType: productData.productType,
                    productId: productData.productId,
                    productImage: productData.productImage,
                    productName: productData.productName,
                    productRating: productData.productRating,
                    productDesc: productData.productDesc,
                    productPrice: productData.productPrice,
                    productDPrice: productData.productDPrice,
                    productDiscount: productData.productDiscount,
                    sellerProductStock: productData.sellerProductStock,
                })
            })

            const res = await response.json()
            if (res.status === 201) {
                alert(res.message)
            }
            else {
                alert(res.message)
            }
        }
        catch (err) {
            console.log(err)
        }

    }


    return (
        <div style={{ display: "flex" }}>
            <div className="product-data-tag-container">
                <p>Product Type</p>
                <p>Product ID</p>
                <p>Product Image</p>
                <p>Product Name</p>
                <p>Product Rating</p>
                <p>ProductDesc</p>
                <p style={{ marginTop: "50px" }}>Product Price</p>
                <p>Product Discount</p>
                <p>Product Offer Price</p>
                <p>ProductSeller Stock</p>
            </div>

            <form method="POST">
                <div className="product-data-container">
                    <input value={productData.productType} onChange={handleChange} name="productType" type="text" autoComplete="off"></input>
                    <input value={productData.productId} onChange={handleChange} name="productId" type="text" autoComplete="off"></input>
                    <input value={productData.productImage} onChange={handleChange} name="productImage" type="text" autoComplete="off"></input>
                    <input value={productData.productName} onChange={handleChange} name="productName" type="text" autoComplete="off"></input>
                    <input value={productData.productRating} onChange={handleChange} name="productRating" type="Number" autoComplete="off"></input>
                    <textarea value={productData.productDesc} onChange={handleChange} name="productDesc" type="text" autoComplete="off"></textarea>
                    <input value={productData.productPrice} onChange={handleChange} name="productPrice" type="Number" autoComplete="off" style={{ marginTop: "30px"}}></input>
                    <input value={productData.productDiscount} onChange={handleChange} name="productDiscount" type="text" autoComplete="off"></input>
                    <p>{productData.productDPrice}</p>
                    <input value={productData.sellerProductStock} onChange={handleChange} name="sellerProductStock" type="Number" autoComplete="off"></input>
                </div>
                <button onClick={updateItem} className="product-data-edit-btn" type="SUBMIT">ADD</button>
            </form>
        </div>
    )
}

export { AddProduct }