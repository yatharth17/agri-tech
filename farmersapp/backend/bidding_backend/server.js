const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const feed = require('./routes/feed.js')
const bid = require('./routes/bid.js')

const app = express()
const port = 8080

app.use('/feed', feed)
app.use('/bid', bid)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.get('/test', (req, res) => {
    res.send('The express server is working properly');
})

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});