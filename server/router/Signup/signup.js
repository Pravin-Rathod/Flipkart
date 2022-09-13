const express = require("express")
const router = express.Router()
require("../../db/connection/conn")

const User = require("../../db/models/userModel")

router.post("/userSignup", async (req, res) => {

    const { name, email, number, password } = req.body

    if (!name || !email || !number || !password) {
        console.log("Empty Field")
        return res.status(400).json({ status: 400, message: "Empty Field" })
    }

    try {
        const isUserExist = await User.findOne({ email: email })

        if (isUserExist) {
            return res.status(400).json({ status: 400, message: "User Already Exist" })
        }
        else {
            const newUser = new User({ name, email, number, password })

            const userSignupStatus = await newUser.save()

            if (userSignupStatus)
                return res.status(201).json({ status: 201, message: "User Registration Done" })
            else
                return res.status(501).json({ status: 501, message:"User Registration Failed" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(501).json({ status:501 , message:err.message})
    }
})

module.exports = router;