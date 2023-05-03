const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();

// Set up CORS headers middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

app.get('/api/procurement-adverts', (req, res) => {
    const adverts = [
        {
            advertID: "1",
            advertTitle: "Job Oppotunity: Software Developer",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (1).jpg"
        },
        {
            advertID: "2",
            advertTitle: "Tender: Renovation of Ablution Block",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (2).jpg"
        },
        {
            advertID: "3",
            advertTitle: "Supplier Registration",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (3).jpg"
        },
        {
            advertID: "4",
            advertTitle: "Contract Awards",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (4).jpg"
        },
    ];

    res.json(adverts);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`server has started on port ${port}`);
});
