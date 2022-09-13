import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteCartProduct(){
    const params = useParams();
    const id = params.productId.toString()
    const navigate = useNavigate()    

    const deleteProduct = async()=>{
        try{

            const response = await fetch("/cartProductDelete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId:id
                })
            })

            const res = await response.json()

            if(res.status==201){                
                navigate("/cart")
            }
            else{
                console.log(res.message)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    deleteProduct()
}

export {DeleteCartProduct}