const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Database Connection Configuration
const dbConfig = {
    host: 'localhost',
    user: 'appuser',
    password: 'PASSWORD',
    database: 'credentials_db'
};

async function authenticateUser(username, password) {
    try {
        const conn = await mysql.createConnection(dbConfig);

        const [rows] = await conn.execute(
            "SELECT userID, username, user_password FROM credentials WHERE username = ?",
            [username]
        );

        if (rows.length > 0) {
            const user = rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                console.log("Login successful!");
                return user; // Return user data if needed
            } else {
                console.log("Invalid username or password");
            }
        } else {
            console.log("Invalid username or password");
        }

    } catch (error) {
        console.error("Error during login:", error);
    }
}

module.exports = { authenticateUser };

// Example usage
//const username = 'existinguser';
//const password = 'userpassword';
//uthenticateUser(username, password);
