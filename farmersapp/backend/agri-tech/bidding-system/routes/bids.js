const express = require('express');
const router = express.Router();
const controller = require('../controllers/bid')
// var auth=require('../middleware/auth')
/** 
 * GET all bids
 */
router.post('/', controller.getAllBids);

/** 
 * GET bid info by BidID
 */
router.post('/get', controller.getBidById);

/** 
 * CREATE bid
 */
router.post('/create', controller.createBid);

/**
 * 1. Place new bid
 * 2. Buy Now
 */
router.post('/place', controller.placeBid);

/**
 * Delete bid 
 */
router.post('/delete', controller.deleteBid);

module.exports = router;
