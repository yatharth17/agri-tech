const getFeedController = (req, res) => {
    // Fetch Crops from database
    // Store crops array in crops[]
    let crops = []
    res.json(crops)
}

const postFeedController = (req, res) => {
    let { crop_name, crop_quantity, crop_bidding_price, crop_buynow_price } = req.body
    // Add this data in hasura
    res.send({
        error: false,
        message: 'Crops added successfully'
    })
}

const getBidController = (req, res) => {
    // Primary key is used to find the object of who's bid price we need to fetch
    let { primary_key } = req.body
    // find the object details using this primary key
    // Save the object details in bidding info variabe
    let bidding_info = {}
    res.json(bidding_info);
}

const postBidController = (req, res) => {
    let { primary_key, new_bid_price } = req.body
    // Update this query and update the bidding price
    // Save the updated price in bidding_value variable
    bidding_value = {}
    res.send(bidding_value)
}

exports.getFeedController = getFeedController
exports.postFeedController = postFeedController
exports.getBidController = getBidController
exports.postBidController = postBidController