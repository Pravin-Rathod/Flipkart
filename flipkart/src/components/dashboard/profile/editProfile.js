import React, { useEffect, useState } from "react"
import {useNavigate } from "react-router-dom"

function EditProfile() {

    const navigate = useNavigate()
    const [userData, setUserData] = React.useState({
        name: "",
        number: "",
        address: ""
    })

    const getProfileData = async () => {

        try {
            const res = await fetch("/userProfile", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application / json"
                },
                credential: "include"
            })

            const data = await res.json()

            if (!res.status === 200) {
                const Error = new Error(res.error)
                throw Error;
            } else {
                setUserData(data)
            }
        }
        catch (err) {
            console.log(err)
            navigate('/login')
        }
    }

    useEffect(() => {
        getProfileData()
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        setUserData(preUserData => {
            return {
                ...preUserData,
                [name]: value
            }
        })
    }

    const userUpdate = async (event) => {

        event.preventDefault()
        const { name, number, address } = userData

        if (!name || !number || !address) {
            alert("Empty Field")
            return
        }
        else {

            try {
                const response = await fetch("/userUpdate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        number: number,
                        address: address,
                    })
                })

                const res = await response.json()
                if (res.status === 201) {
                    alert("User Data Changed")
                    navigate("/dashboard/profile")
                }
                else {
                    alert(res.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div style={{ display: "flex" }}>
            <div className="user-data-tag-container">
                <p>Email ID</p>
                <p>Name</p>
                <p>Mobile No.</p>
                <p>Address</p>
            </div>
            <form method="POST">
                <div className="user-data-container">
                    <p>{userData.email}</p>
                    <input onChange={handleChange} name="name" value={userData.name} autoComplete="off"></input>
                    <input onChange={handleChange} name="number" value={userData.number} autoComplete="off"></input>
                    <textarea onChange={handleChange} name="address" value={userData.address} autoComplete="off"></textarea>
                </div>
                <button onClick={userUpdate} className="user-data-edit-btn" type="SUBMIT">SAVE</button>
            </form>
        </div>
    )
}

export { EditProfile }