const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Database Connection Configuration (same as in register.js)
// ...

async function authenticateUser(username, password) {
    try {
        const conn = await mysql.createConnection(dbConfig);

        const [rows] = await conn.execute(
            "SELECT id, username, password FROM users WHERE username = ?",
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

// Example usage
const username = 'existinguser';
const password = 'userpassword';
authenticateUser(username, password);
