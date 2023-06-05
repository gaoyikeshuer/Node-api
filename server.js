const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModels')

app.use(express.json())
app.use(express.urlencoded({extends: false}))
//route

app.get('/',(req,res) =>{
    res.send("Heloo api")

})

app.get('/blog',(req,res) =>{
    res.send("Hello blog my name is yike")
})
app.get('/products', async(req,res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
app.put('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(404).json({message:`cannot find any products with id: ${id}`})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.get('/products/:id', async(req,res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error){
    res.status(500).json({message: error.message})
    }
})

app.post('/products', async(req,res) =>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})
//delete a product

app.delete(`/products/:id`, async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:`cannot find any products with ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery",false)
mongoose.connect("mongodb+srv://yikegao8:Nm6683317@yikeapi.l4cvyl1.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(()=>{
    console.log('connected to MongoDB')
    app.listen(3000, ()=>{
        console.log("Node Api app is running on port 3000")
    })

}).catch((error)=>{
    console.log(error)
})