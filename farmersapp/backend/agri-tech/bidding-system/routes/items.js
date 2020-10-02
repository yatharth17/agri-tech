const express = require('express');
const router = express.Router();
const controller = require('../controllers/items')

/** 
 * GET all items info
 */
router.post('/', controller.getAllItemInfo);

/** 
 * GET item info
 */
router.post('/get', controller.getInfo);

/** 
 * CREATE item
 */
router.post('/create', controller.createItem);

module.exports = router;