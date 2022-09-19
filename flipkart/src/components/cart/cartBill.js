import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function CartBill(data) {

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const navigate = useNavigate();

    const [totalPrice,setTotalPrice] = React.useState(0);
    const [totalDPrice,setTotalDPrice] = React.useState(0);
    const [totalQuantity,setTotalQuantity] = React.useState(0);


    const getData = async(id)=>{
        try {
            const response = await fetch("/productFetch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId:id
                })
            })
    
            const res = await response.json();
            return res;
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        let tq = 0;
        let tp = 0;        
        let td = 0;
        data.cartData.map(async product=>{
            tq+=product.productQuantity;
            var pp = await getData(product.productId);
            tp=pp.productPrice
            td=tp-pp.productDPrice 
            setTotalPrice(preData=>preData+tp*product.productQuantity);
            setTotalDPrice(preData=>preData+td*product.productQuantity);

        })
        setTotalQuantity(tq);
    },[])

    const deleteCart = async()=>{
        const response = await fetch("/cartDelete",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                cartId:data.cartId
            })
        })

        const res = await response.json();
        if(res.status === 201){
            alert("Cart Removed");
            navigate("/")
        }
        else
            console.log(res.message);
    }

    const totalDiscount = parseInt(100*((totalDPrice)/totalPrice));
    return (
        <div className="cart-details-container">
            <h2 style={{ textAlign: "center" }}>CART DETAILS</h2>
            <hr></hr>
            <div className="cart-details">
                <div className="cart-detail">
                    <p className="cart-detail-label">QUANTITY</p>
                    <p>{totalQuantity}</p>
                </div>
                <div className="cart-detail">
                    <p className="cart-detail-label">TOTAL PRICE</p>
                    <p>{formatter.format(totalPrice)}</p>
                </div>
                <div className="cart-detail">
                    <p className="cart-detail-label">TOTAL DISCOUNT</p>
                    <p>{formatter.format(totalDPrice)}</p>
                </div>
            </div>
            <hr></hr>
            <div className="cart-detail">
                <p className="cart-detail-label">AMOUNT</p>
                <p>{formatter.format(totalPrice-totalDPrice)}</p>
            </div>
            <p style={{ color: "green" }}>You will save {totalDiscount} % on this purchase</p>
            <div className="cart-checkout-details">
                <NavLink className="cart-checkout-btn" to="/">PROCEED TO CHECKOUT</NavLink>
                <button onClick={deleteCart} className="cart-delete-btn"><i className="bi bi-trash"></i>DELETE CART</button>
            </div>
        </div>
    )
}

export { CartBill }