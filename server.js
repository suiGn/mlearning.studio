//server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));

// Route for index page
app.get('/', (req, res) => {
    res.render('index');
});

// Route for gallery
app.get('/gallery', (req, res) => {
    const noBackgroundDir = path.join(__dirname, 'public', 'images', 'PixelArt', 'no-background');
    const BackgroundDir = path.join(__dirname, 'public', 'images', 'PixelArt', 'bckgrd');
    let noBackgroundImages = [];
    let withBackgroundImages = [];
    try {
        noBackgroundImages = fs.readdirSync(noBackgroundDir)
                               .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        withBackgroundImages = fs.readdirSync(BackgroundDir)
                                 .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    } catch (err) {
        console.error('Error reading directory:', err);
        // Handle the error or set noBackgroundImages to an empty array
    }
    res.render('8bit-gallery', { noBackgroundImages, withBackgroundImages });
});

app.get('/datasets', (req, res) => {
    res.json({ message: 'List of datasets' });
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
