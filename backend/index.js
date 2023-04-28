const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()


// Middleware 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',require("./routes/index"))


if(process.env.NODE_ENV=='production'){
    const path = require('path')

    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(path.join(__dirname,'../'),'frontend','build')))
        res.sendFile(path.resolve(path.join(__dirname,'../'),'frontend','build','index.html'))
    })
}


// Server 
app.listen(2200,()=>{
    console.log("Server at 2200");
})