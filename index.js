const express = require('express');
const axios = require('axios');
// const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 5001;

const apiKey = ``;
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.');
});

// Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const response = await axios.get(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Product Reviews 
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    try {
        const response = await axios.get(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});