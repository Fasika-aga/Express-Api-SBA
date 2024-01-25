const express = require('express');
const app = express();
const port = 3000;
const logger = require('./middleware/logger'); // Adjust the path accordingly
const path = require('path'); 
const pug = require('pug'); 

// app.use(logger);

app.set('view engine', 'pug'); // Set Pug as the template engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  // Render a view using Pug
  res.render('index', { title: 'Gemstone Shop' });
});
app.use('/api', apiRoutes);


// In-memory storage for gemstones
let gemstones = [
    { id: 1, name: 'Diamond', color: 'Colorless' },
    { id: 2, name: 'Ruby', color: 'Red' },
    // Add more gemstones as needed
];

app.use(express.json());

// Routes
app.get('/gemstones', (req, res) => {
    res.json(gemstones);
});

app.get('/gemstones/:id', (req, res) => {
    const gemstoneId = parseInt(req.params.id);
    const gemstone = gemstones.find(g => g.id === gemstoneId);

    if (!gemstone) {
        res.status(404).json({ error: 'Gemstone not found' });
        return;
    }

    res.json(gemstone);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
