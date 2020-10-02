const request = require('supertest');
const app = require('../app');

describe('/GET Bids', () => {
    it('should GET all bids', async () => {
        const res = await request(app)
            .post('/api/bid')
            .send({
                "token":"token"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
        expect(res.body.error).toBe(null)
    }, timeout=10000)

    it('should try GET bid which is not in DB', async () => {
        const res = await request(app)
            .post('/api/bid/get')
            .send({
                "token":"token",
                "bid_id": "ok"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe("Bid not found!")
    }, timeout=10000)
})

describe('/POST Bids', () => {
    it('should POST a new bid', async () => {
        const res = await request(app)
            .post('/api/bid/create')
            .send({
                "token":"token",
                "item_name":"Tomato",
                "item_description":"The tomato is the edible, often red, berry of the plant Solanum lycopersicum, commonly known as a tomato plant.",
                "image_url":"https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528",
                "min_price":15,
                "buy_now_price":30,
                "quantity":50,
                "timer_limit":"01:00:00"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
        expect(res.body.error).toBe(null)
    }, timeout=10000)

    it('should POST a new bid with wrong type of data', async () => {
        const res = await request(app)
            .post('/api/bid/create')
            .send({
                "token":"token",
                "item_name":"Tomato",
                "item_description":"The tomato is the edible, often red, berry of the plant Solanum lycopersicum, commonly known as a tomato plant.",
                "image_url":"https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528",
                "min_price":"sasta dedo",
                "buy_now_price":"mehnga lelo",
                "quantity":50,
                "timer_limit":"00:15:00"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
        expect(res.body.message.status).toMatch(new RegExp("item validation failed"))
    }, timeout=10000)
})