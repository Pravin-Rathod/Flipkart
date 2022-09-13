const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
require("../../db/connection/conn")

const User = require("../../db/models/userModel")



router.post("/userLogin", async (req, res) => {

    const { email, password } = req.body
    console.log(req.body)

    if (!email || !password)
        return res.status(400).json({ status: 400, message: "Empty Field" })

    try {
        const isUserExist = await User.findOne({ email: email })

        if (!isUserExist)
            return res.status(401).json({ status: 401, message: "User Does Not Exist" })

        const userVerify = await bcrypt.compare(password, isUserExist.password)

        if (!userVerify)
            return res.status(401).json({ status: 401, message: "Invalid Credentials" })
        else {

            const sessionToken = await isUserExist.generateSessionToken()
            res.cookie("flipkart", sessionToken, {
                expires: new Date(Date.now() + 123400000),
                httpOnly: true
            })
            return res.json({ status: 200, message: "Login Done" })

        }
    }
    catch (err) {
        res.status(400).json({ status: 400, message: "Login Failed" })
    }
})


module.exports = router;