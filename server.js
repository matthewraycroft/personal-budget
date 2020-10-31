const express = require('express');
const app = express();
const port = 3000;
const mongoDBClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017/chart_db';
const mongoose = require("mongoose")
const chartModel = require("./chart_schema")
app.use('/', express.static('public'));

app.get('/hello', (req, res) =>{
    res.send('Hello World!');
});


app.get(`/budget`, (req, res) =>{
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Connected to the database")

        chartModel.find({})
                 .then((data)=>{
                     console.log(data)
                     res.json(data)
                     mongoose.connection.close()
                 })
                 .catch((connectionError)=>{
                    console.log(connectionError)
                 })
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })

});

app.post(`/chartBudget`, (req, res) =>{
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        var newData= new chartModel({
            title: req.body.title,
            color: req.body.color,
            budget: req.body.budget
        })
                   chartModel.insertMany(newData)
            .then((data)=>{
                res.json(data)
                mongoose.connection.close()
            })
            .catch((connectionError)=>{
               console.log(connectionError)
            })
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
});