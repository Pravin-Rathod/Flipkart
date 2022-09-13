import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserNavbar } from "../header/navbar/userNavbar";
import { EditProfile } from "./profile/editProfile";
import { Profile } from "./profile/userProfile";
import { MyWishlist} from "./mywishlist/myWishlist"
import {UserVerify} from "./userVerify"
import { MyOrder } from "./myorder/myOrder";

function Dashboard(){

    UserVerify()     

    return(
        <div className="dashboardpage-container">/
            <UserNavbar/>
            <div className="dashboard-page">
                <Routes>
                    <Route path="/" element={<Profile/>}></Route>
                    <Route path="/profile" element={<Profile/>}></Route>
                    <Route path="/editprofile" element={<EditProfile/>}></Route>
                    <Route path="/myorder" element={<MyOrder/>}></Route>
                    <Route path="/mywishlist" element={<MyWishlist/>}></Route>
                </Routes>
            </div>
        </div>
    )
}

export {Dashboard}