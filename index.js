import express from "express";
import cors from "cors";
import translate from 'translate-google';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('This api was made by Rwandan alx students.');
});

const accessToken = (req, res, next) => {
    const { accessToken } = req.query; // Access token from query parameters
    if (accessToken) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Translate text
app.post('/translate', accessToken, async (req, res) => {
    const { text, targetLanguage } = req.body;

    try {
        const translation = await translate(text, { to: targetLanguage });
        res.json({ translation });
    } catch (error) {
        res.status(500).json({ error: "Translation failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


