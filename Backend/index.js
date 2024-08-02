const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = 'john_doe_17091999';
    const email = 'john@xyz.com';
    const roll_number = 'ABCD123';

    if (!data) {
        return res.status(400).json({
            is_success: false,
            message: 'Data not provided'
        });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && /^[a-zA-Z]$/.test(item));
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_alphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

module.exports = app;
