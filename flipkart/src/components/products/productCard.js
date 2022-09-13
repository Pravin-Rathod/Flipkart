import React from "react";
import {useNavigate} from "react-router-dom"

function ProductCard(props){

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const [fav,setFav]  = React.useState("bi bi-heart")
    const navigate = useNavigate();


    function handleFavClick(){
        var favCn=fav=="bi bi-heart"?"bi bi-heart-fill":"bi bi-heart"
        setFav(favCn)
    }
    
    function getProduct(){
        navigate(`/products/${props.productId}`)
    }


    return(
        <div className="product-card" onClick={getProduct}>
            <div className="product-card-img-container">
                {props.productTag == "true" && <p className={props.productTagCn}>{props.productTagState}</p>}
                <i className={fav} onClick={handleFavClick}></i>
                <img className="product-card-image" src={props.productImage}></img>
            </div>
            <div className="product-card-desc">
                <p className="product-card-name">{props.productName}</p>
                <p className="product-card-ratting">{props.productRating}{" "}<i className="bi bi-star-fill"></i></p>
                <div className="product-card-price">
                    <p className="product-card-dprice">{formatter.format(props.productDPrice)}</p>
                    <p className="product-card-oprice">{formatter.format(props.productPrice)}</p>
                    <p className="product-card-price-discount">{props.productDiscount} % off</p>
                </div>
            </div>
        </div>
    )
}

export {ProductCard}