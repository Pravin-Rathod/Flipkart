import React, { useEffect, useState } from "react";
import "./navbar.css"
import { NavLink, useNavigate } from "react-router-dom";
import icon from "../../../resources/images/flipkart.png"

function Navbar() {
    const[cartItemCount,setCartItemCount] = useState(0)
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch("/cartItemCount", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                    })
                })
    
                const res = await response.json()   
                setCartItemCount(res.count)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData().catch(console.error())
    },[cartItemCount])

    return (
        <div className="nav">
            <div className="nav-logo">
                <NavLink to="/"><img className="nav-logo-icon" src={icon}></img></NavLink>
            </div>
            <div className="nav-search-container">
                <input className="nav-search-input" type="text" placeholder="Enter Product Name..."></input>
                <a className="nav-search-btn" href="#">
                    <i className="bi-search"></i>
                </a>
            </div>
            <NavLink to={"/cart"} className="nav-cart-container">
                <i className="bi bi-cart2" style={{ padding: "5px" }}></i>Cart
                <p className="nav-cart-count">{cartItemCount}</p>
            </NavLink>
            <NavLink to="/login" className="btn-user-login" type="submit">Login</NavLink>
            <NavLink className="nav-profile" to="/dashboard"><i className="bi bi-person-circle"></i></NavLink>
            
        </div>
    )
}

export { Navbar }