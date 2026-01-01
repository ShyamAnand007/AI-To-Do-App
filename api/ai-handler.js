export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { payload } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; 

    // Using the 2026 stable Gemini 2.5 Flash model
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        // If the AI is sending JSON, we need to make sure we're sending the clean data back
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "The server kitchen had an error!" });
    }
}
