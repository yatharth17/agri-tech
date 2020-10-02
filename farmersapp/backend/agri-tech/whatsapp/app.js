const sulla = require('sulla');
var request = require('request');

const baseURL = "https://microbits-bidding-api.herokuapp.com/api/bid"

sulla.create().then(client => start(client));

function start(client) {

    client.onMessage(async (message) => {

        let senderInfo = {
            "name": message.sender.name,
            "content": message.content,
            "contact": message.from.slice(2, 12),
            "business": message.sender.isBusiness,
            "enterprise": message.sender.isEnterprise,
            "me": message.sender.isMe,
            "forwarded": message.isForwarded,
            "groupMessage": message.isGroupMsg,
            "newMessage": message.isNewMsg,
            "notSpam": message.chat.notSpam,
        };

        if (senderInfo.content.length === 0) {
            client.sendText(message.from, "🤖 I'm afraid your message was empty!");
            return;
        }

        if (senderInfo.business || senderInfo.enterprise) {
            client.sendText(message.from, "🤖 Sorry! I don't accept posts from business or enterprise accounts!");
            return;
        }

        if (senderInfo.forwarded) {
            client.sendText(message.from, "🤖 Sorry! I don't accept forwarded messages.");
            return;
        }

        if (senderInfo.groupMessage) {
            client.sendText(message.from, "🤖 Sorry! I don't accept group messages.");
            return;
        }

        // Handle greeting Message
        if (senderInfo.content.toLowerCase() === "hi") {
            client.sendText(message.from, "🤖 Hello! Welcome to AgriTech whatsapp service, we are delighted to have you here!");
            client.sendText(message.from, "🤖 Send *Getting Started* to begin posting about your produce & expand your reach!");
            return;
        }

        // Handle getting Started Message
        if (senderInfo.content.toLowerCase() === "getting started") {

            let greet = "🤖 Hey, glad to see you decided to sell your produce using AgriTech.";
            let afterGreet = "You can post about your produce on our online bidding platform by following a simple format to provide information about your produce so that people bidding can know better about it.";
            let step = `
*Item Name:* <your-item-name-here>
*Item Description:* <item-description-here>
*Minimum Selling Price:* <item-msp-here>
*Buy Now Price:* <item-buy-now-price-here>
*Quantity:* <item-selling-quantity-here>
*Time Limit for bid:* <timer-limit-for-the-item-on-bid> (timer-format -> HH,MM,SS)
        `;
            let note = "*Posting about produce, via this service is limited to 5 produces for unregistered sellers, to get benefit of selling more produce in the bidding system please register on our platform AgriTech.*";
            client.sendText(message.from, greet);
            client.sendText(message.from, afterGreet);
            client.sendText(message.from, step);
            client.sendText(message.from, note);

            return;
        }

        // Handling all other messages
        if (senderInfo.name && senderInfo.contact && senderInfo.notSpam) {

            // Convert to string the message content
            let message_content = senderInfo.content.toString();
            try {

                // Fetch item info, if provided
                let itemInfo = {
                    "itemName": message_content.match(/^[*]?Item Name\:[*]?\s?(.)*$/gm)[0].split(":")[1],
                    "itemDescription": message_content.match(/^[*]?Item Description\:[*]?\s?(.)*$/gm)[0].split(":")[1],
                    "itemMSP": message_content.match(/^[*]?Minimum Selling Price\:[*]?\s?(.)*$/gm)[0].split(":")[1],
                    "itemBuyNow": message_content.match(/^[*]?Buy Now Price\:[*]?\s?(.)*$/gm)[0].split(":")[1],
                    "itemQuantity": message_content.match(/^[*]?Quantity\:[*]?\s?(.)*$/gm)[0].split(":")[1],
                    "itemTimer": message_content.match(/^[*]?Time Limit for bid\:[*]?\s?(.)*$/gm)[0].split(":")[1],
                }

                // Check if complete information about item is provided
                if (itemInfo["itemName"] && itemInfo["itemDescription"] && itemInfo["itemMSP"] && itemInfo["itemBuyNow"] && itemInfo["itemQuantity"] && itemInfo["itemTimer"]) {

                    // Handle '*' present in BOLD messages keys
                    for (var key in itemInfo) {
                        if (itemInfo.hasOwnProperty(key)) {
                            // If message has BOLD keys
                            if (itemInfo[key].includes("*")) {
                                // If more than 1 '*' are present then the itemInfo is invalid (contain special character)
                                if (itemInfo[key].split("*").length !== 2) {
                                    client.sendText(message.from, "🤖 I'm afraid that you provided the in-correct item information!\nPlease check item name/description, no special characters allowed!");
                                    return;
                                }
                                // Remove '*' and strip spaces
                                itemInfo[key] = itemInfo[key].split("*")[1].trim();
                            }
                        }
                    }

                    // Manipulate Timer
                    itemInfo['itemTimer'] = itemInfo['itemTimer'].replace(/,/g, ':');

                    // Validate Timer
                    let tempTimer = itemInfo['itemTimer'].split(':');
                    if (!(parseInt(tempTimer[0]) <= 168 && parseInt(tempTimer[1]) < 60 && parseInt(tempTimer[2]) < 60)) {
                        client.sendText(message.from, "🤖 I'm afraid that you provided the in-correct timer details!\nMaximum timer can be 168:59:59!");
                        return;
                    }

                    // Validate Item Price
                    if (!(parseInt(itemInfo['itemMSP']) > 0 && parseInt(itemInfo['itemBuyNow']) > parseInt(itemInfo['itemMSP']) && parseInt(itemInfo['itemQuantity']) > 0)) {
                        client.sendText(message.from, "🤖 I'm afraid that you provided the in-correct information!\nPlease check item price/quantity!");
                        return;
                    }

                    // Validate Item Description & Name
                    if (/\d/.test(itemInfo['itemName']) || /\d/.test(itemInfo['itemDescription']) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(itemInfo['itemName']) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(itemInfo['itemDescription'])) {
                        client.sendText(message.from, "🤖 I'm afraid that you provided the in-correct item information!\nPlease check item name/description, no numbers & special characters allowed!");
                        return;
                    }

                    // POST request to the Bidding API
                    client.sendText(message.from, "🤖 Hey, your request was found to be in order, and is being processed.\nYou will be notified about the status of the same via WhatsApp!");
                    var options = {
                        'url': baseURL + '/create',
                        'headers': {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        form: {
                            'item_name': itemInfo['itemName'],
                            'item_description': itemInfo['itemDescription'],
                            'image_url': "https://images-na.ssl-images-amazon.com/images/I/91D4wbML5gL._SX425_.jpg",
                            'min_price': itemInfo['itemMSP'],
                            'buy_now_price': itemInfo['itemBuyNow'],
                            'quantity': itemInfo['itemQuantity'],
                            'timer_limit': itemInfo['itemTimer'],
                            'token': 'token'
                        }
                    };
                    request.post(options, function (err, response) {

                        // If, successful request
                        if (JSON.stringify(response.body).match(new RegExp("Item inserted"))) {
                            client.sendText(message.from, "🤖 Hey, congratulations! 🎉\nInformation about your produce has been posted to AgriTech Online Bidding System, you'll be notified on the bids being placed on your produce via SMS & WhatsApp updates.\n\nThank You for believing in us.\nWe are delighted to serve you.\nTeam MicroBits\nIn association with Smart India hackathon 2020.");
                            return;
                        } else {
                            client.sendText(message.from, "🤖 I'm afraid that something went wrong while processing your request! Please try again after sometime!");
                            return;
                        }

                    });
                } else {
                    // Format not followed
                    client.sendText(message.from, "🤖 I'm afraid that you didn't followed the correct format!");
                    return;
                }

            } catch (error) {
                // Handle messages othen than specified format
                client.sendText(message.from, "🤖 You sent something I couldn't understand!\n\nSend *Getting Started* to begin posting about your produce & expand your reach!");
            }
        }
    });
}