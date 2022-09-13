import React, { useEffect } from "react";

function CartBill(data) {
    const [totalPrice,setTP] = React.useState(0)
    var pr = 0

    data.cartData.map(product=>{
        async function editCart(){
            try{
                const response = await fetch("/productFetch", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId:product.productId
                    })
                })
                const res = await response.json();
                console.log(res)
            }
            catch(err){
                console.log(err)
            }
        }
        console.log(editCart())
    })


    useEffect(()=>{
        setTP(pr)
    },[])

    return (
        <div className="cart-details-container">
            <p style={{ textAlign: "center" }}>CART DETAILS</p>
            <hr></hr>
            <div className="cart-details">
                <div className="cart-detail">
                    <p className="cart-detail-label">QUANTITY</p>
                    <p></p>
                </div>
                <div className="cart-detail">
                    <p className="cart-detail-label">TOTAL PRICE</p>
                    <p>{totalPrice}</p>
                </div>
                <div className="cart-detail">
                    <p className="cart-detail-label">TOTAL DISCOUNT</p>
                    <p></p>
                </div>
            </div>
            <hr></hr>
            <div className="cart-detail">
                <p className="cart-detail-label">AMOUNT</p>
                <p></p>
            </div>
            <p style={{ color: "green" }}>You will save discount on this purchase</p>

            <button className="cart-checkout-btn">PROCEED TO CHECKOUT</button>
        </div>
    )
}

export { CartBill }