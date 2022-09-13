const mongoose = require("mongoose")
const DB = process.env.DATABASE

mongoose.connect(DB).then(() => {
    console.log("connected to Database")
}).catch(err => console.log(console.log(err)))