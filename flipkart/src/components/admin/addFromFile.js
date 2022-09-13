import React from "react";
import data from "../../resources/data/data.json"

function AddProducts(){

    const addp=()=>{
        var id=1;
        data.map(item=>{
            var pp = item._3i9_wc;
            var op = Number(pp.replace(/[^0-9.-]+/g, ""));

            var d = item._30jeq3;
            var dp = Number(d.replace(/[^0-9.-]+/g, ""));
            const dis = 100 * (op - dp) / op;
            
            try {
                const response =  fetch("/productAdd", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productType: "KIDSANDTOYS",
                        productId: "KAT"+id++,
                        productImage: item.Image,
                        productName: item.s1q9rs,
                        productRating: item._3lwzlk,
                        productDesc: item._3djpdu,
                        productPrice:op,
                        productDPrice: dp,
                        productDiscount: parseInt(dis),
                        sellerProductStock: Math.floor(Math.random()*10),
                    })
                })

                const res =  response.json()
                if (res.status === 201) {
                    console.log("done")
                }
                else {
                    console.log("failed")
                }
            }
            catch (err) {
                console.log(err)
            }
        })
    }

    return (
        <div style={{marginTop:"100px"}}>
            <button onClick={addp}>add</button>
        </div>
    )
}

export {AddProducts}