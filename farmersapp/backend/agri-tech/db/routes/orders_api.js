const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const Order = require('../models/orders')

//order placing
router.post("/create", async (req, res) => {


})



//order deletion
router.post("/delete", async (req, res) => {



})

module.exports = router