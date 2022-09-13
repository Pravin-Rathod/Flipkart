import React, { useEffect } from "react"
import { Routes,Route} from "react-router-dom"
import { AdminNavbar } from "../header/navbar/adminNavbar"
import { AddProducts } from "./addFromFile"
import { AddProduct } from "./addProduct"
import { DeleteProduct } from "./deleteProduct"
import { EditProduct } from "./editProduct"
import { ShowProducts } from "./showProducts"

function Admin() {
    return(
        <div className="dashboardpage-container">/
            <AdminNavbar/>
            <div className="dashboard-page">
                <Routes>
                    <Route path="/showproducts" element={<ShowProducts/>}></Route>
                    <Route path="/addproduct" element={<AddProduct/>}></Route>
                    <Route path="/addproducts" element={<AddProducts/>}></Route>
                    <Route path="/editproduct/:productId" element={<EditProduct/>}></Route>
                    <Route path="/deleteproduct/:productId" element={<DeleteProduct/>}></Route>
                </Routes>
            </div>
        </div>
    )
}

export { Admin }