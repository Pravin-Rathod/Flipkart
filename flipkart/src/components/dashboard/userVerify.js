import { useNavigate } from "react-router-dom"

const UserVerify = async() =>{
    const navigate = useNavigate()

    try {
        const response = await fetch("/userAuthenticate", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application / json"
            },
            credential: "include"
        })

        const res = await response.json()
        if(res.status!=201)
            navigate('/login')    
    }
    catch (err) {
        alert("Unauthorized User")
        navigate('/login')
    }
}

export {UserVerify}
