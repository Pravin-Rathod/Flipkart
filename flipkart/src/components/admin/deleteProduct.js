import { useNavigate, useParams } from "react-router-dom";

function DeleteProduct(){
    const params = useParams();
    const navigate = useNavigate();
    const id = params.productId.toString()

    const deleteData = async () => {
        try {
            const rerespons = await fetch("/productDelete",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    productId:id
                })
            })
            const res  = await rerespons.json()
            if(res.status==201){
                alert("Product Deleted")
            }
            else{
                alert(res.message);                
            }
        }
        catch (err) {
            console.log(err)
        }

        navigate("/admin/showProducts")
    }

    deleteData().catch(console.error())
}

export {DeleteProduct}