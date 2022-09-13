import React from "react";
import { ProductBar } from "../header/productbar/productbar";
import { ProductContainer } from "../products/productContainer";

function Homepage(){
    return(
        <div>
            <ProductBar/>
            <div className="product-container-titlebar">
                <h4>BEST SMARTPHONES</h4>
                <button>view all</button>
            </div>  
            <ProductContainer productType="KIDSANDTOYS"/>
        </div>
    )
}

export {Homepage}