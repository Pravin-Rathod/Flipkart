import React,{useEffect} from "react";
import { NavLink, useNavigate} from "react-router-dom";


function CartProduct(product) {

    const navigate = useNavigate()
    const [editQunatity,setEditQunatity] = React.useState(0)

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/productFetch", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId:product.productId
                    })
                })

                setProductData(await res.json())
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchData().catch(console.error())
    }, [product])
    
    const [cartData, setCartData] = React.useState({
        productId:product.productId,
        productQuantity: product.productQuantity
    });

    const editCart =async()=>{
        try{
            const response = await fetch("/cartProductUpdate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId:product.productId,
                    productQuantity:cartData.productQuantity
                })
            })

            const res = await response.json();
            alert(res.message)
        }
        catch(err){
            console.log(err)
        }
    }
    
    function toggleEditQuantity(){
        if(editQunatity==1){
            editCart()
            window.location.reload()
        }
        setEditQunatity(editQunatity^1)
    }

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


    function visitProduct(){
        navigate(`/product/${productData.productId}`)
    }


    return (
        <div className="cart-product-container">
            <div className="cart-product-img-container" onClick={visitProduct}>
                <img src={productData.productImage}></img>
            </div>

            <div className="cart-product-edit-container">
                {
                    editQunatity==0?
                        <button className="cart-edit-trash-btn" onClick={toggleEditQuantity}><i className="bi bi-pencil"></i></button>
                    :
                        <div style={{display:"flex"}}>
                            <button onClick={decrQty} className="cart-edit-btn">-</button>
                            <input value={cartData.productQuantity} className="s-product-data-qty" readOnly></input>
                            <button onClick={incrQty} className="cart-edit-btn">+</button>
                            <button className="cart-edit-check-btn" onClick={toggleEditQuantity}><i className="bi bi-check2"></i></button>
                        </div>
                }
                <NavLink to={`/deleteCartProduct/${productData.productId}`} className="cart-edit-trash-btn"><i className="bi bi-trash" style={{padding:"0px",margin:"0px"}}></i></NavLink>
            </div>

            <div className="cart-product-details">
                <p>{productData.productName}</p>
                <p>{cartData.productQuantity}*{formatter.format(productData.productDPrice)}</p>
                <p style={{ textDecoration: "line-through", color: "gray", fontWeight: "lighter" }}>{formatter.format(productData.productPrice)}</p>
                <p style={{ color: "green" }}>{productData.productDiscount}% off</p>
                <hr></hr>
                <p><span className="cart-product-details-total">TOTAL</span>{formatter.format(productData.productDPrice*cartData.productQuantity)}</p>
                <hr></hr>
            </div>
        </div>
    )
}

export { CartProduct }