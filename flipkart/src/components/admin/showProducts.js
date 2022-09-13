import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css"

function ShowProducts() {

    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/productsFetch", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
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

    
    return (
        <div style={{ display: "flex" }}>
            <table id="productsTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Discount</th>
                        <th>Item Final Price</th>
                        <th>Item Rating</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(item => (
                            <tr>
                                <td>{item.productId}</td>
                                <td>{item.productName}</td>
                                <td>{item.productPrice}</td>
                                <td>{item.productDiscount}</td>
                                <td>{item.productDPrice}</td>
                                <td>{item.productRating}</td>
                                <td>{item.sellerProductStock}</td>
                                <Link className="product-admin-action" to={`/admin/editproduct/${item.productId}`}><i className="bi bi-pencil"></i></Link>
                                <Link className="product-admin-action" to={`/admin/deleteproduct/${item.productId}`}><i className="bi bi-trash"></i></Link>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export { ShowProducts }