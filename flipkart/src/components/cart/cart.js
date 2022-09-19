import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { CartBill } from "./cartBill";
import { CartProduct } from "./cartProduct";
import "./cart.css"


function Cart() {

    const [cartData, setCartData] = React.useState([])
    const [cartId,setCartId] = React.useState(0)
    var data=0
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/cartFetch", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                    })
                })

                const res = await response.json()
                if(res.status==404){
                    alert(res.message)
                    navigate("/")
                }
                setCartId(res.cartId)
                setCartData(res.cartData)
                // data=cartData
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData().catch(console.error())
    },[])
    
    if(cartData.length==0)
    {
        return(
            <div className="errorpage">
                <h2>Empty Cart</h2>
            </div>
        )
    }

    return (
        <div className="cart-container">
            <div className="cart-products-container">
            {
                cartData.map(product=>(
                    <CartProduct key={product.productId} productId={product.productId} productQuantity={product.productQuantity}>
                    </CartProduct>
                ))
            }
            </div>
            <CartBill cartData={cartData} cartId={cartId}/>
        </div>
    )
}

export { Cart }