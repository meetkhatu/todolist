const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const collection = require("./model")

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/todolist')

app.post('/add', (req,res) => {
    const task =req.body.task
    collection.create({
        task:task
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/get',(req,res) => {
    collection.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id',(req,res) => {
    const {id} =req.params;
    collection.findByIdAndUpdate( { _id: id } , { done : true } )
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    collection.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(8000,()=> {
    console.log("Server is Running")
})