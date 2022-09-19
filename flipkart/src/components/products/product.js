import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Product() {

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const params = useParams();
    const navigate = useNavigate();
    const id = params.productId.toString()
    const [productExist,setProductExist] = useState(0);

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

    const [cartData, setCartData] = React.useState({
        productId: id,
        productQuantity: 1
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/productFetch", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId: id
                    })
                })

                setProductData(await res.json())
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData().catch(console.error())

        const getCartData = async()=>{
            try{
                const response = await fetch("/cartProductExist",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId: id
                    })
                })

                const res = await response.json()
                if(res.status==201){
                    setProductExist(1)
                }
            }
            catch(err){
                console.log(err)
            }
        }

        getCartData().catch(console.error())

    }, [])

    function incrQty() {
        if (cartData.productQuantity >= 10) {
            alert("Quantity can't be more than 10")
        }
        else {
            setCartData(preCartData => {
                return {
                    productId: productData.productId,
                    productQuantity: preCartData.productQuantity + 1
                }
            })
        }
    }

    function decrQty() {
        if (cartData.productQuantity <= 1) {
            alert("Quantity can't be less than 1")
        }
        else {
            setCartData(preCartData => {
                return {
                    productId: productData.productId,
                    productQuantity: preCartData.productQuantity - 1
                }
            })
        }
    }


    const addToCart = async () => {

        if(productExist==1){
            navigate("/cart")
            return
        }
        try {
            const addProduct = await fetch("/addToCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    product: {
                        productId: cartData.productId,
                        productQuantity: cartData.productQuantity
                    }
                })
            })

            const res = await addProduct.json()
            if (res.status == 201)
                navigate("/cart")
            else
                alert("Product added to the cart")
        }
        catch (err){
            console.log(err)
        }
    }


    return (
        <div className="s-product-container">
            <div className="s-product-img-container">
                <img src={productData.productImage}></img>
            </div>
            <div className="s-product-data-container">
                <h1 style={{ margin: "0%" }}><span className="s-proudct-data-productName">{productData.productName}</span></h1>
                <p className="s-proudct-data-productRating">{productData.productRating}<i className="bi bi-star-fill"></i></p>
                <div className="s-product-data-productPrice">
                    <h3 className="s-product-data-price">{formatter.format(productData.productDPrice)}</h3>
                    <h3 className="s-product-data-dprice">{formatter.format(productData.productPrice)}</h3>
                    <h3 className="s-product-data-discount">{productData.productDiscount} % off</h3>
                </div>
                <article className="s-product-data-desc">{productData.productDesc}</article>
                {productExist==1?<p style={{ fontWeight: "bold" }} >Product already in Cart</p>:
                <p style={{ fontWeight: "bold" }}>Quantity:
                    <button onClick={decrQty} className="cart-edit-btn">-</button>
                    <input value={cartData.productQuantity} className="s-product-data-qty" readOnly></input>
                    <button onClick={incrQty} className="cart-edit-btn">+</button>
                </p>}
                <div style={{ display: "flex" }}>
                    <button className="s-product-cart-btn" onClick={addToCart}><i className="bi bi-cart2" style={{ paddingRight: "10px" }}></i>{productExist==1?"GO TO CART":"ADD TO CART"}</button>
                    <button className="s-product-whishlist-btn"><i className="bi bi-bag-heart" style={{ paddingRight: "10px" }}></i>ADD TO WISHLIST</button>
                </div>
            </div>
        </div>
    )
}

export { Product }         
