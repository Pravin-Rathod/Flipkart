import React from "react";
import { NavLink } from "react-router-dom";
import "./error.css"

function Error(){
    return(
        <div className="errorpage">
            <h2>Error</h2>
            <p>Page Not Available</p>
            <p>Click Here <NavLink to="/" className="user-form-anchor">www.flipkart.com</NavLink> For Homepage</p>
        </div>
    )
}

export {Error}