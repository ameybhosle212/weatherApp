const route = require('express').Router()
// const { default: axios } = require('axios');
const axios = require('axios')

route.post("/",async(req,res)=>{
    const {location , city} = req.body;
    try {
        const {data} = await axios.post(`${process.env.URL}?access_key=${process.env.access_key}&query=${city}`);
        if(data.location['country'].toLowerCase() === location.toLowerCase()){
            return res.json({
                'error':null,
                'humidity':data.current.humidity,
                'temperature':data.current.temperature,
            })
        }else{
            return res.json({
                'error':'Place You serched is Not in Location/Country'
            })
        }
    } catch (error) {
        return res.json(error);   
    }
})

module.exports = route;