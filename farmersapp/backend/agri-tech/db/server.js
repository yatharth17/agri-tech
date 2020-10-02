const express = require('express')
var bodyParser = require('body-parser')

const item = require('./routes/bid_api.js')

const app = express();
const connectDB = require('./db/db')
connectDB();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api/db/bid", item)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server Started on ${port}`)
})
