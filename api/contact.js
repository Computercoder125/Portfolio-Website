const mysql = require("mysql2/promise"); // Use mysql2 with promise support

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { firstName, lastName, email, Message } = req.body;

        if (!firstName || !lastName || !email || !Message) {
            return res.status(400).send("All fields are required.");
        }

        try {
            // Create a connection pool
            const pool = mysql.createPool({
                host: process.env.DB_HOST, // Use environment variables
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                connectionLimit: 10, // Limit connections to avoid overload
            });

            const query =
                "INSERT INTO contactData (firstName, lastName, email, Message) VALUES (?, ?, ?, ?)";
            await pool.query(query, [firstName, lastName, email, Message]);

            res.send("Thank you! Your response has been recorded.");
        } catch (err) {
            console.error("Error saving to database:", err);
            res.status(500).send("Database error");
        }
    } else {
        res.status(405).send("Method not allowed");
    }
}
