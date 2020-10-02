const request = require('request');
const something = 0;
const baseURL = "https://farmersapp-db.herokuapp.com/api/db/item"

const getAllItemInfo = function (req, res, next) {

    // Fetch arguments
    let token = req.body.token;

    // Check if all arguments are present
    if (!(token)) {
        return res.json({
            error: 'invalid request',
            success: false,
            message: {
                'response': null
            }
        });
    }

    /** Token Verification Code **/

    /** GET ItemInfo using SELECT query **/
    request.get(baseURL + '/', function (err, response) {
        return res.json({
            error: null,
            success: true,
            message: {
                'items': JSON.parse(response.body),
            }
        });
    });

}

const getInfo = function (req, res, next) {

    // Fetch arguments
    let itemID = req.body.item_id;
    let token = req.body.token;

    // Check if all arguments are present
    if (!(itemID && token)) {
        return res.json({
            error: 'invalid request',
            success: false,
            message: {
                'response': null
            }
        });
    }

    /** Token Verification Code **/

    /** GET ItemInfo using SELECT query **/
    request.get(baseURL + '/get?item_id=' + itemID, function (err, response) {
        return res.json({
            error: null,
            success: true,
            message: {
                'item': JSON.parse(response.body),
            }
        });
    });

}

const createItem = function (req, res, next) {

    // Fetch arguments
    let { sellerID, name, description, imageURL, price, fixedPrice, quantity } = req.body
    let token = req.body.token;

    // Check if all arguments are present
    if (!(sellerID && name && description && imageURL && price && fixedPrice && quantity && token)) {
        return res.json({
            error: 'invalid request',
            success: false,
            message: {
                'response': null
            }
        });
    }

    /** Token Verification Code **/

    /** GET ItemInfo using SELECT query **/
    request.post(baseURL + '/create', function (err, response) {
        return res.json({
            error: null,
            success: true,
            message: {
                'item': JSON.parse(response.body),
            }
        });
    });

}

exports.getAllItemInfo = getAllItemInfo
exports.getInfo = getInfo
exports.createItem = createItem