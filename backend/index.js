const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()


// Middleware 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',require("./routes/index"))


// Server 
app.listen(2200,()=>{
    console.log("Server at 2200");
})