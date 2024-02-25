const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes/Resources
app.use('/api/polls', require('./Resources/Polls'));
app.use('/api/votes', require('./Resources/Votes'));

//Server error status code handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 1852;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

