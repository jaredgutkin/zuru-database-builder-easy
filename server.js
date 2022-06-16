const { request, response } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8005
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'StarTrekAPI'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//CRUD process
app.get('/', (req, res) =>{
    db.collection('Alien Info').find().toArray()
        .then(data => {
            let nameList = data.map(item => item.speciesName)
            console.log(nameList)
            res.render('index.ejs', {info: nameList})
        })
        .catch(error => console.log(error))
})

//POST NEW ENTRY
app.post('/api', (req, res)=>{
    console.log('post heard')
    db.collection('Alien Info').insertOne(
        req.body
    )
    .then(result =>{
        console.log(result)
        res.redirect('/')
    })
})

//UPDATE ENTRY
app.put('/updateEntry', (req, res)=>{
    console.log(req.body)
    Object.keys(req.body).forEach(key => {
        if ( req.body[key] === null || req.body[key] === 'undefined' || req.body[key] === "" ){
            delete req.body[key]
        }
    })
    console.log(req.body)
    db.collection('Alien Info').findOneAndUpdate(
        {name: req.body.name},
        {
            $set: req.body
        }
    )
    .then(result => {
        console.log(result)
        response.json('success')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteEntry', (req, res)=>{
    
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})