const mysql = require("mysql");

const con = mysql.createConnection({
    host: "Vercel",
    user: "root",
    password: "Computergeek27!",
    database: "personalwebsite",
});

export default function handler(req, res) {
    if (req.method === "POST") {
        const { firstName, lastName, email, Message } = req.body;

        if (!firstName || !lastName || !email || !Message) {
            return res.status(400).send("All fields are required.");
        }

        const query = "INSERT INTO contactData (firstName, lastName, email, Message) VALUES (?, ?, ?, ?)";
        con.query(query, [firstName, lastName, email, Message], (err) => {
            if (err) {
                console.error("Error saving to database:", err);
                return res.status(500).send("Database error");
            }
            res.send("Thank you! Your response has been recorded.");
        });
    } else {
        res.status(405).send("Method not allowed");
    }
}
