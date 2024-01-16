//importing dependencies
const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

//in-memory data store
let store = {}
store.accounts = []

//Express app and middleware
let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

//sent back to the client is the entire accounts array.
app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts)
})

app.post('/accounts', (req, res) => {
    let newAccount = req.body
    let id = store.accounts.length
    store.accounts.push(newAccount)
    res.status(201).send({ id: id })
})

app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id] = req.body
    res.status(200).send(store.accounts[req.params.id])
})

app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id, 1)
    res.status(204).send("Account deleted successfully")
})


app.listen(3000)
console.log("Encendido");