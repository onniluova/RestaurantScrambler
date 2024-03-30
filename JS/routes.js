const express = require('express');
const bodyParser = require('body-parser');
const registerUser = require('./register.js').registerUser;
const authenticateUser = require('./login.js').authenticateUser;

const app = express();
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    registerUser(username, password)
        .then(() => res.send('Registration successful!'))
        .catch(err => res.status(500).send('Registration error'));
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    authenticateUser(username, password)
        .then(user => res.json(user)) // If successful, send user data
        .catch(err => res.status(401).send('Invalid login'))
});

app.listen(3000, () => console.log('Server listening on port 3000'));
