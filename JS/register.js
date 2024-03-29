const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Database Connection Configuration
const dbConfig = {
    host: 'localhost',
    user: 'appuser',
    password: '1234',
    database: 'credentials_db'
};

async function registerUser(username, password) {
    try {
        const conn = await mysql.createConnection(dbConfig);

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is a common bcrypt salt round

        const [result] = await conn.execute(
            "INSERT INTO credentials (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );

        console.log(`User registered with ID: ${result.insertId}`);

    } catch (error) {
        console.error("Error during registration:", error);
    }
}

// Example Usage (assuming you have a way to get form data)
const username = 'newuser';
const password = 'userpassword';
registerUser(username, password);