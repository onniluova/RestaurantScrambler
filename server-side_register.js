const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
let users = {};

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Nimi tai salasana puuttuu' });
    }

    if (users[username]) {
        return res.status(400).json({ message: 'Käyttäjä on jo olemassa' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users[username] = { password: hashedPassword };
    res.status(201).json({ message: 'Käyttäjä rekisteröity' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!users[username]) {
        return res.status(400).json({ message: 'Käyttäjää ei ole olemassa' });
    }

    const valid = await bcrypt.compare(password, users[username].password);
    if (!valid) {
        return res.status(401).json({ message: 'Virheellinen salasana' });
    }

    res.status(200).json({ message: 'Kirjautuminen onnistui' });
});

app.listen(3001, () => console.log('Servuu pyörii portilla 3001'));