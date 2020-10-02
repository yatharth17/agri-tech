const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Item = require('../models/bid.js')

let dateUtil = require('../utils/date.js');

//item description
router.post("/create", async (req, res) => {
    
    if (!req.body)
        return res.json({error:"Invalid Request",status:200,success:false,response:false})
    
    try {
        let { name, description, image_url, price, fixed_price, quantity, timer_limit ,seller_name } = req.body
        let timer_start = new Date();
        
        let timer_end = await dateUtil.getEndDate(timer_start, timer_limit);
        
        let latest_bid_time = timer_start;
        let curr_highestBidderusername = 'null';
        let curr_bidprice = 0;
        let total_bids = 0;
        
        var item = new Item({
            name,
            description,
            seller_name,
            image_url,
            price,
            fixed_price,
            quantity,
            curr_bidprice,
            curr_highestBidderusername,
            total_bids,
            latest_bid_time,
            timer_start,
            timer_end
        })
        
        let bid=await item.save()
        
        
        return res.json({
            "bids": [bid],
            "message": "Bid Created"
        })
    }
    catch (err) {

        return res.json({
            "bids": [], 
            "message": err.message
        })
    }
})

//fetching all the items
router.get("/", async (req, res) => {
    
    try {
        
        let bid = await Item.find()

       return res.json({
           "bids": [...bid]
        })
    } 
    catch (err) {

        return res.json({
            "bids": null,
            "message": err.message
        });
    }
})

//fetching items by id
router.get("/get", async (req, res) => {

    try {

        let bid = await Item.findById(req.query.item_id);

        if(!bid)
            return res.json({
                "bids": [],
                "message": "No bid found with Id"
            })

        return res.json({
            "bids": [bid]
        })
    }
    catch (err) {
        
       return res.json({
           "bids": [],
           "message": err.message
        });
    }

})

//update bid
router.post("/update", async (req, res) => {

    let { id } = req.body;
    var updated_obj = req.body;
    delete updated_obj['id'];

    try {

        let bid = await Item.findByIdAndUpdate(id, updated_obj, { new: true })
        
        if (!bid)
            return res.json({
                "bids": [],
                "message":"No Bid found to update"
            })

        return res.json({
            "bids": [bid],
            "message": "Bid Updated"
        })
    }
    catch (err) {

        return res.json({
            "bids": [],
            "message": err.message
        })
    }

})

//item deletion
router.post("/delete", async (req, res) => {
    let { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.json({bid:[],"message":"Invalid Id"})
    
    try {
        let item = await Item.findById(id)
        
        if (!item)
            return res.json({
                "bids": [],
                "message": "No Bid found to delete"
            })

        let bid=await item.remove()

        return res.json({
            "bids": [bid],
            "message": "Bid Deleted"
        })
    }
    catch (err) {

        return res.json({
            "message": err.message
        })
    }

})

module.exports = router