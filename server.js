const express = require('express')
const app = express()

//route

app.get('/',(req,res) =>{
    res.send("Heloo api")
    
})

app.listen(3000, ()=>{
    console.log("Node Api app is running on port 3000")
})