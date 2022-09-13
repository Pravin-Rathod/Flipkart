import React from "react";
import top_offers from "../../../resources/images/top_offers.png"
import electronic from "../../../resources/images/Electronic.png"
import home_app from "../../../resources/images/Home_Appliences.png"
import kids_items from "../../../resources/images/Kids.png"
import mobiles from "../../../resources/images/Mobiles.png"
import "./productbar.css"

function ProductBar(){
    return (
        <div className="product-bar">
            <div className="product-container">
                <img src={top_offers}></img>
                <a href="top_offers">Top Offers</a>
            </div>
            <div className="product-container">
                <img src={mobiles}></img>
                <a href="mobiles">Mobiles</a>
            </div>
            <div className="product-container">
                <img src={electronic}></img>
                <a href="electronic">Electronic</a>
            </div>
            <div className="product-container">
                <img src={home_app}></img>
                <a href="home_app">Home Appliences</a>
            </div>
            <div className="product-container">
                <img src={kids_items}></img>
                <a href="kids_items">Kids Items</a>
            </div>
        </div>
    )
}
export {ProductBar}