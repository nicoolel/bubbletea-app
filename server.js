// require express and store that in app variable
const express = require('express')
const app = express()
// require mongo client to connect to our db
const MongoClient = require('mongodb').MongoClient
// running on port 2121
const PORT = 2121
require('dotenv').config()

// mongo cluter is hidden in .env file and create database name
let db,
    dbConnectionStr = process.env.DB_STRING,
    // need to put this in mongodb string
    dbName = 'bubbletea'

// stuff to make data readable and successful connection
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

// middleware
// allows us to use ejs
app.set('view engine', 'ejs')
// allow us to use public folder
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// get request on home page
// sort likes by highest to lowest - RANKED
app.get('/',(request, response)=>{
    db.collection('bubbletea').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

// post request to add a new rapper
app.post('/addBubbleTea', (request, response) => {
    db.collection('bubbletea').insertOne({bubbleTeaName: request.body.bubbleTeaName,
    bubbleTeaShop: request.body.bubbleTeaShop, likes: 0})
    .then(result => {
        console.log('Bubble Tea Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

// put request to add a like and refresh page
app.put('/addOneLike', (request, response) => {
    db.collection('bubbletea').updateOne({bubbleTeaName: request.body.bubbleTeaNameS, bubbleTeaShop: request.body.bubbleTeaShopS,likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))
})

// delete request to delete one entry
app.delete('/deleteBubbleTea', (request, response) => {
    db.collection('bubbletea').deleteOne({bubbleTeaName: request.body.bubbleTeaNameS})
    .then(result => {
        console.log('Bubble Tea Deleted')
        response.json('Bubble Tea Deleted')
    })
    .catch(error => console.error(error))

})

// listen on port 2121 or .env 
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})