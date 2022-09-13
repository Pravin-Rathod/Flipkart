import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import icon from "../../resources/images/flipkart-banner.jpg"
import "./login.css"

function Login() {

    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    })


    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(preFormData => {
            return ({
                ...preFormData,
                [name]: type === "checkbox" ? checked : value
            })
        })
    }

    const userLogin = async (event) => {
        event.preventDefault()
        const { email, password } = formData


        if (!email || !password)
            return alert("Empty Field")
        else {
            const response = await fetch("/userLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const res = await response.json()

            if (res.status === 201) {
                // what to do after login//
            }
            else {
                console.log(res)
                alert(res.message)
            }
        }
    }

    return (
        <div className="login-form">
            <div className="form-banner">
                <img src={icon}></img>
            </div>
            <form>
                <div className="form-input-container">
                    <label>Email</label>
                    <input onChange={handleChange} className="form-input" type="email" autoComplete="off" name="email" required />
                </div>
                <div className="form-input-container">
                    <label>Password </label>
                    <input onChange={handleChange} className="form-input" type="password" name="password" autoComplete="off" required />
                </div>
                <div className="form-btn-container">
                    <button onClick={userLogin} className="form-submit-btn">Login</button>
                </div>
                <div className="form-a-container">
                    <p>New to the flipkart <NavLink to="/signup" autoComplete="off" className="form-anchor">Signup</NavLink> here.</p>
                </div>
            </form>
        </div>
    )
}

export { Login }