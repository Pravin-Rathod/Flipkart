import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import icon from "../../resources/images/flipkart-banner.jpg"

function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        number: "",
        password: "",
        cpassword: ""
    })

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(preFormData => {
            return {
                ...preFormData,
                [name]: type === "checkbox" ? checked : value

            }
        })
    }    
    
    const registerUser = async (event) => {
        event.preventDefault()

        const { name, email, number, password, cpassword } = formData

        if (!name || !email || !number || !password || !cpassword) {
            return alert("Empty Field")
        }
        else if (password != cpassword)
            return alert("Password Does Not Match")
        else {
            const response = await fetch("userSignup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    number: number,
                    password: password,
                })
            })

            const res = await response.json()
            if (res.status === 201) {
                window.alert("Signup Done, Please Login")
                navigate("/login")
            }
            else {
                alert(res.message)
            }
        }
    }

    return (
        <div className="signup-form">
            <div className="form-banner">
                <img src={icon}></img>
            </div>
            <form method="POST">
                <div className="form-input-container">
                    <label>Name</label>
                    <input onChange={handleChange} className="form-input" type="text" name="name" value={formData.name} autoComplete="off" required />
                </div>
                <div className="form-input-container">
                    <label>Email</label>
                    <input onChange={handleChange} className="form-input" type="text" name="email" value={formData.email} autoComplete="off" required />
                </div>
                <div className="form-input-container">
                    <label>Mobile Number</label>
                    <input onChange={handleChange} className="form-input" name="number" value={formData.number} autoComplete="off" required />
                </div>
                <div className="form-input-container">
                    <label>Password</label>
                    <input onChange={handleChange} className="form-input" type="password" name="password" value={formData.password} autoComplete="off" required />
                </div>
                <div className="form-input-container">
                    <label>Confirm Password</label>
                    <input onChange={handleChange} className="form-input" type="password" name="cpassword" value={formData.cpassword} autoComplete="off" required />
                </div>
                <div className="form-btn-container">
                    <button onClick={registerUser} className="form-submit-btn">Signup</button>
                </div>
                <div className="form-a-container">
                    <p>Already a customer <NavLink to="/login" className="form-anchor">Login</NavLink> here.</p>
                </div>
            </form>
        </div>
    )
}

export { Signup }