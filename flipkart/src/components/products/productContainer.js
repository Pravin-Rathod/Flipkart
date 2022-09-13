import React, { useEffect } from "react";
import { ProductCard } from "./productCard";
import "./product.css"

function ProductContainer(props){

    const productType = props.productType
    const [products,setProducts] = React.useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/productsFetchType",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        productType:productType
                    })
                })
                setProducts(await res.json())
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchData().catch(console.error())
    }, [])
    
    return(
        <div className="product-card-container">
            {
                products.map(item=>{
                    let productTagState
                    let productTagCn
                    let productTag = "false"

                    if (item.sellerProductStock == 0) {
                        productTagState = "SOLD OUT"
                        productTagCn = "product-card-soldout"
                        productTag = "true"

                    }
                    else if (item.productDiscount >= 25) {
                        productTagState = "SALE"
                        productTagCn = "product-card-sale"
                        productTag = "true"
                    }
                    return (<ProductCard
                        key={item.productId}
                        productId={item.productId}
                        productImage={item.productImage}
                        productName={item.productName}
                        productPrice={item.productPrice}
                        productDPrice={item.productDPrice}
                        productDiscount={item.productDiscount}
                        productTagState = {productTagState}
                        productTag = {productTag}
                        productTagCn = {productTagCn}
                        productRating={item.productRating}
                        sellerProductStock={item.productStock}
                    >
                    </ProductCard>)
                })
            }
        </div>
    )
}

export {ProductContainer}