import React from "react";
import { NavLink } from "react-router-dom";

function AdminNavbar(){
    return (
        <div className="profile-navbar-container">
            <ul className="profile-navbar">
                <li className="profile-navbar-list"><NavLink to="/admin">User Profile</NavLink></li>
            </ul>
            <ul className="profile-navbar">
                <li className="profile-navbar-list"><NavLink to="/admin/showproducts">Show Product</NavLink></li>
                <li className="profile-navbar-list"><NavLink to="/admin/addproduct">Add Product</NavLink></li>
                <li className="profile-navbar-list"><NavLink to="/admin/addproducts">Add From File</NavLink></li>
            </ul>
            <ul className="profile-navbar">
                <li className="profile-navbar-list"><NavLink to="/profile/logout">Log Out</NavLink></li>
            </ul>
        </div>
    )
}

export {AdminNavbar}