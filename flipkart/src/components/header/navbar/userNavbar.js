import { NavLink } from "react-router-dom"
import "./userNavbar.css"
function UserNavbar(){
    return(
        <div className="profile-navbar-container">
            <ul className="profile-navbar">
                <li className="profile-navbar-list"><NavLink to="/dashboard/profile">User Profile</NavLink></li>
            </ul>
            <ul className="profile-navbar">
                <li className="profile-navbar-list"><NavLink to="/dashboard/myorder">My Order</NavLink></li>
                <li className="profile-navbar-list"><NavLink to="/dashboard/mywishlist">My WishList</NavLink></li>
            </ul>
            <ul className="profile-navbar">
                <li className="profile-navbar-list"><NavLink to="/dashboard/editprofile">Edit Profile</NavLink></li>
            </ul>
            <ul className="profile-navbar">
                <li className="profile-navbar-list"><NavLink to="/dashboard/logout">Log Out</NavLink></li>
            </ul>
        </div>
    )
}

export {UserNavbar}