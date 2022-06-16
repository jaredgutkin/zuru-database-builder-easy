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

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) =>{
    db.collection('Alien Info').find().toArray()
        .then(data => {
            let nameList = data.map(item => item.speciesName)
            console.log(nameList)
            res.render('index.ejs', {info: nameList})
        })
        .catch(error => console.log(error))

})

app.post('/api', (req, res)=>{

})

app.put('/updateEntry', (req, res)=>{

})

app.delete('/deleteEntry', (req, res)=>{
    
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})