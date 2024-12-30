export default async function handler(req, res) {
    if (req.method === "POST") {
        // Extract data from the request body
        const { firstName, lastName, email, Message } = req.body;

        // Validate input fields
        if (!firstName || !lastName || !email || !Message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        try {
            // Simulate saving data (log it to the server console)
            console.log("New contact submission:", {
                firstName,
                lastName,
                email,
                Message,
            });

            // Respond with a success message
            res.status(200).json({ message: "Thank you! Your response has been recorded." });
        } catch (err) {
            // Handle unexpected errors
            console.error("Error processing the request:", err);
            res.status(500).json({ error: "An unexpected error occurred." });
        }
    } else {
        // Handle unsupported HTTP methods
        res.status(405).json({ error: "Method not allowed" });
    }
}
