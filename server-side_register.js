const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');  // Built-in Node.js module for working with file paths

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
// In-memory storage for users
let users = {};

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    if (users[username]) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user
    users[username] = { password: hashedPassword };
    res.status(201).json({ message: 'User registered' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    if (!users[username]) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    // Check password
    const valid = await bcrypt.compare(password, users[username].password);
    if (!valid) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Logged in' });
});

app.listen(3001, () => console.log('Server running on port 3001'));