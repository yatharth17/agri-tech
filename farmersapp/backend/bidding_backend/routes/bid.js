const express = require('express')
const router = express.Router();
const controllers = require('../controllers/controllers.js')
const bodyParser = require('body-parser')

router.use(bodyParser.json());

router.route('/bid')
.get(controllers.getBidController)
.post(controllers.postBidController)

module.exports = router    