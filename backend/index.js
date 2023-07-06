const express = require('express');
const { connection } = require('./db');
const { userRouter } = require('./routers/user.routers');
require('dotenv').config()
var cors = require('cors')
const app = express()
 
app.use(cors())

app.use( express.json())
app.use("/books",userRouter)
app.get("/",async(req,res)=>{
    res.send("ok")
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connect with db");
    } catch (error) {
        console.log(error);
    }

    console.log("server is runing at 8080")
})