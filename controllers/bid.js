const request = require('request');
const something = 0;
const baseURL = "https://microbits-db-api.herokuapp.com/api/db/bid"

const getAllBids = function (req, res) {

    try {
        // Fetch arguments
        let token = req.body.token;

        // Check if all arguments are present
        if (!(token)) {
            return res.json({
                error: true,
                success: false,
                message: 'invalid request'
            });
        }

        /** GET all BidInfo using SELECT query **/
        request.get(baseURL + '/', function (err, response) {
            /** Return Response **/
            if (response && response.body) {
                return res.json({
                    error: false,
                    success: true,
                    message: JSON.parse(response.body)
                });
            } else {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Something went wrong.'
                });
            }
        });

    } catch (exception) {
        return res.json({
            error: true,
            success: false,
            message: exception.message
        })
    }
}

const getBidById = function (req, res) {

    try {

        // Fetch arguments
        let bidID = req.body.bid_id;
        let token = req.body.token;

        // Check if all arguments are present
        if (!(bidID && token)) {
            return res.json({
                error: true,
                success: false,
                message: 'invalid request'
            });
        }

        /** GET BidInfo using SELECT query **/
        request.get(baseURL + '/get?item_id=' + bidID, function (err, response) {
            /** Return Response **/
            if (response && response.body) {
                return res.json({
                    error: false,
                    success: true,
                    message: JSON.parse(response.body)
                });
            } else if (response && response.body && !response.body.message) {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Bid not found!'
                });
            } else {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Something went wrong.'
                });
            }
        });

    } catch (exception) {
        return res.json({
            error: true,
            success: false,
            message: exception.message
        });
    }

}

const createBid = function (req, res) {

    try {

        // Fetch arguments
        let itemName = req.body.item_name;
        let sellerName = req.body.seller_name;
        let itemDescription = req.body.item_description;
        let imageUrl = req.body.image_url;
        let minPrice = req.body.min_price;
        let buyNowPrice = req.body.buy_now_price;
        let quantity = req.body.quantity;
        let timerLimit = req.body.timer_limit;
        let token = req.body.token;
        let seller_name=req.body.seller_name

        // Check if all arguments are present
        if (!(sellerName && itemName && timerLimit && itemDescription && imageUrl && minPrice && buyNowPrice && quantity && token)) {
            return res.json({
                error: true,
                success: false,
                message: 'invalid request'
            });
        }

        /** CREATE NEW Bid using INSERT query **/
        var options = {
            'url': baseURL + '/create',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'name': itemName,
                'seller_name': sellerName,
                'description': itemDescription,
                'image_url': imageUrl,
                'price': minPrice,
                'fixed_price': buyNowPrice,
                'quantity': quantity,
                'timer_limit': timerLimit,
                'seller_name':seller_name
            }
        };
        request.post(options, function (err, response) {
            /** Return Response **/
            if(response && response.body) {
                return res.json({
                    error: false,
                    success: true,
                    message: JSON.parse(response.body)
                });
            } else {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Something went wrong.'
                });
            }
        });

    } catch (exception) {
        return res.json({
            error: true,
            success: false,
            message: exception.message
        });
    }

}

const placeBid = function (req, res, next) {

    try {

        // Fetch arguments
        let bidID = req.body.bid_id;
        let bidPrice = req.body.bid_price;
        let buyerID = req.body.buyer_id;
        let token = req.body.token;

        // Check if all arguments are present
        if (!(bidID && buyerID && bidPrice && token)) {
            return res.json({
                error: true,
                success: false,
                message: 'invalid request'
            });
        }

        /** GET MinPrice, CurrentBidPrice, MaxPrice using SELECT query **/
        request.get(baseURL + '/get?item_id=' + bidID, function (err, response) {

            if (!response || !response.body) {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Something went wrong.'
                });
            }

            if (JSON.parse(response.body).message || !JSON.parse(response.body).bids) {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Bid not found!'
                });
            }

            let sellerName = JSON.parse(response.body).bids[0].seller_name;
            let currentHigestBidder = JSON.parse(response.body).bids[0].curr_highestBidderusername;
            if(sellerName === buyerID) {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Seller cannot bid on their own produce.'
                });
            } else if(buyerID === currentHigestBidder) {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Highest Bidder cannot bid again untill beated.'
                });
            }

            let minPrice = JSON.parse(response.body).bids[0].price;
            let currentBidPrice = JSON.parse(response.body).bids[0].curr_bidprice;
            let maxPrice = JSON.parse(response.body).bids[0].fixed_price;


            /* Check if timer has expired for the bid */
            let currentBidTime = new Date();
            let endDate = new Date(JSON.parse(response.body).bids[0].timer_end);
            if (currentBidTime.getTime() > endDate) {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Timer has expired'
                });
            }

            if (!((bidPrice > minPrice) && (bidPrice > currentBidPrice) && (bidPrice <= maxPrice))) {
                return res.json({
                    error: true,
                    success: false,
                    message: 'invalid bid price'
                });
            }

            /** Check if BidPrice equals MaxPrice **/
            if (bidPrice === maxPrice) {
                /** UPDATE SOLD Flag for the bid using UPDATE query **/
                var options = {
                    'url': baseURL + '/update',
                    'headers': {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    form: {
                        'id': bidID,
                        'curr_bidprice': bidPrice,
                        'sold_flag': 1,
                        'curr_highestBidderusername': buyerID,
                        'total_bids': something,
                        'latest_bid_time': currentBidTime
                    }
                };
                request.post(options, function (err, response) {
                    /** Return Response **/
                    if(response && response.body) {
                        return res.json({
                            error: null,
                            success: true,
                            message: 'sold'
                        });
                    } else {
                        return res.json({
                            error: true,
                            success: false,
                            message: 'Something went wrong. Cannot be sold.'
                        });
                    }
                });
            } else {
                /** Update CurrentBidPrice & BuyerInfo using UPDATE query **/
                var options = {
                    'url': baseURL + '/update',
                    'headers': {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    form: {
                        'id': bidID,
                        'curr_bidprice': bidPrice,
                        'curr_highestBidderusername': buyerID,
                        'total_bids': something,
                        'latest_bid_time': currentBidTime
                    }
                };
                request.post(options, function (err, response) {
                    /** Return Response **/
                    if(response && response.body) {
                        return res.json({
                            error: null,
                            success: true,
                            message: JSON.parse(response.body)
                        });
                    } else {
                        return res.json({
                            error: true,
                            success: false,
                            message: 'Something went wrong. Cannot update bid price.'
                        });
                    }
                });
            }
        });

    } catch (exception) {
        return res.json({
            error: true,
            success: false,
            message: exception.message
        });
    }

}

const deleteBid = function (req, res) {

    try {

        // Fetch arguments
        let sellerName = req.body.seller_name;
        let bidID = req.body.bid_id;
        let token = req.body.token;

        // Check if all arguments are present
        if (!(sellerName && bidID && token)) {
            return res.json({
                error: true,
                success: false,
                message: 'invalid request'
            });
        }

        request.get(baseURL + '/get?item_id=' + bidID, function (err, response) {

            if (!response || !response.body) {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Something went wrong.'
                });
            }

            if (JSON.parse(response.body).message || !JSON.parse(response.body).bids) {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Bid not found!'
                });
            }

            let bidSellerName = JSON.parse(response.body).bids[0].seller_name;
            let currentHigestBidder = JSON.parse(response.body).bids[0].curr_highestBidderusername;
            if(sellerName !== bidSellerName) {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Seller can only delete the bids on their produce.'
                });
            }
            
            if(currentHigestBidder != 'null') {
                return res.json({
                    error: true,
                    success: false,
                    message: 'Bid cannot be deleted.'
                });
            }
            
            /** DELETE bid using DELETE query **/
            var options = {
                'url': baseURL + '/delete',
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                form: {
                    'id': bidID,
                }
            };
            request.post(options, function (err, response) {
                /** Return Response **/
                if(response && response.body) {
                    return res.json({
                        error: null,
                        success: true,
                        message: {
                            'status': JSON.parse(response.body),
                        }
                    });
                } else {
                    return res.json({
                        error: true,
                        success: false,
                        message: 'Something went wrong. Unable to delete bid.'
                    });
                }
            });
        });

    } catch (exception) {
        return res.json({
            error: true,
            success: false,
            message: exception.message
        });
    }

}

exports.getAllBids = getAllBids
exports.getBidById = getBidById
exports.createBid = createBid
exports.placeBid = placeBid
exports.deleteBid = deleteBid