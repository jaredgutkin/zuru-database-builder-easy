const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8005
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = 'StarTrekAPI'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.listen(process.env.PORT || PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})