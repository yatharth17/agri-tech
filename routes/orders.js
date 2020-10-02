var express = require('express');
var router = express.Router();
const something = 0;

/** 
 * GET order info
 */
router.post('/api/order/info', function(req, res, next) {
  
  // Fetch arguments
  let orderID = req.body.order_id;
  let token = req.body.token;

  // Check if all arguments are present
  if(!(orderID && token)) {
    return res.json({
      error: 'invalid request',
      success: false,
      message: {
        'response': null
      }
    });
  }

  /** Token Verification Code **/

  /** GET OrderInfo using SELECT query **/
  // Returns: <BidID, ItemID>, MapBy: <orderID>

  /** GET ItemInfo using SELECT query **/
  // Returns: <Name, Description, ImageURL, Location>, MapBy: <ItemID>
  
  /** GET SellerInfo using SELECT query **/
  // Returns: <Name, Rating, Location>, MapBy: <ItemID>
  
  /** GET BidInfo using SELECT query **/
  // Returns: <MinPrice, MaxPrice, CurrentBidPrice, CurrentHighestBidder, TotalBids>, MapBy: <BidID>
  
  /** Return Response **/  
  return res.json({
    error: null,
    success: true,
    message: {
      'response':  {
        'order' : 'Order Info json object',
        'item': 'Item Info json object',
        'seller': 'Seller Info json object',
        'bid': 'Bid Info json object'
      }
    }
  });

});

/**
 * CREATE new order
 */
router.post('/api/order/place', function(req, res, next) {
  
  // Fetch arguments
  let orderID = req.body.order_id;
  let orderPrice = req.body.order_price;
  let bidID = req.body.bid_id;
  // let locality = req.body.locality;
  // let area = req.body.area;
  // let city = req.body.city;
  // let state = req.body.state;
  let token = req.body.token;

  // Check if all arguments are present
  if(!(orderID && orderPrice && bidID && token)) {
    return res.json({
      error: 'invalid request',
      success: false,
      message: {
        'response': null
      }
    });
  }

  /** Token Verification Code **/

  /* GET highest bidder ID using SELECT query */
  // Returns: <BidderID>, MapBy: <BidID>
  
  /* GET highest bidder address using SELECT query */
  // Returns: <FirstName, LastName, Locality, Area, City, State>, MapBy: <BidderID>

  /* INSERT into orders table */

  /** Return Response **/
  return res.json({
    error: null,
    success: true,
    message: {
      'response': {
        'order_id': orderID,
      }
    }
  });

});

/**
 * Delete order 
 */
router.post('/api/order/delete', function(req, res, next) {
  
  // Fetch arguments
  let orderID = req.body.bid_id;
  let token = req.body.token;

  // Check if all arguments are present
  if(!(orderID && token)) {
    return res.json({
      error: 'invalid request',
      success: false,
      message: {
        'response': null
      }
    });
  }

  /** Token Verification Code **/

  /* DELETE order */

  return res.json({
    error: null,
    success: true,
    message: {
      'response': res
    }
  });

});

/**
 * Update Order Delivery Address
*/
router.post('/api/order/update/address', function(req, res, next) {
  
  // Fetch arguments
  let orderID = req.body.order_id;
  let locality = req.body.locality;
  let area = req.body.area;
  let city = req.body.city;
  let state = req.body.state;
  let token = req.body.token;

  // Check if all arguments are present
  if(!(orderID && locality && area && city && state && token)) {
    return res.json({
      error: 'invalid request',
      success: false,
      message: {
        'response': null
      }
    });
  }

  /** Token Verification Code **/

  /* UPDATE order delivery address */

  /** Return Response **/
  return res.json({
    error: null,
    success: true,
    message: {
      'response': 'updated address'
    }
  });

});

/**
 * Update Order Refund Status
*/
router.post('/api/order/update/refund', function(req, res, next) {
  
  // Fetch arguments
  let orderID = req.body.order_id;
  let refundStatus = req.body.refund_status;
  let token = req.body.token;

  // Check if all arguments are present
  if(!(orderID && refundStatus && token)) {
    return res.json({
      error: 'invalid request',
      success: false,
      message: {
        'response': null
      }
    });
  }

  /** Token Verification Code **/

  /* UPDATE order refund status */

  /** Return Response **/
  return res.json({
    error: null,
    success: true,
    message: {
      'response': 'updated refund status'
    }
  });

});

module.exports = router;
