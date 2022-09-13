import React, { useEffect, useState } from "react"
import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import "../dashboardPage.css"
import "./profile.css"

function Profile() {
    const navigate = useNavigate()
    const [userData, setUserData] = React.useState({
        name: "Admin",
        number: "9876543210",
        email: "admin@admin.com",
        address: ""
    })

    useEffect(() => {

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
                setUserData(data)
            }
            catch (err) {
                console.log(err)
            }
        }

        getProfileData()

    }, [])
    
    return (
        <div style={{display:"flex"}}>
            <div className="user-data-tag-container">
                <p>Email ID</p>
                <p>Name</p>
                <p>Mobile No.</p>
                <p>Address</p>
            </div>
            <div className="user-data-container">
                <p>{userData.email}</p>
                <p>{userData.name}</p>
                <p>{userData.number}</p>
                <p>{userData.address}</p>
            </div>

        </div>
    )
}

export { Profile }