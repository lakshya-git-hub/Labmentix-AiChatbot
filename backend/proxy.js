import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/gemini', async (req, res) => {
  const { text } = req.body;
  console.log('Received request for Gemini API with text:', text);
  try {
    const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyD85Rd8CsKNDC-TTCm03IQwCtl4JSmYNlY';
    console.log('Sending request to Gemini API URL:', geminiApiUrl);
    const requestBody = JSON.stringify({
      contents: [{ parts: [{ text }] }]
    });
    console.log('Request body sent to Gemini:', requestBody);

    const response = await fetch(
      geminiApiUrl,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody
      }
    );
    const data = await response.json();
    console.log('Raw response from Gemini API:', data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// New endpoint to list available Gemini models
app.get('/api/list-gemini-models', async (req, res) => {
  try {
    const apiKey = 'AIzaSyD85Rd8CsKNDC-TTCm03IQwCtl4JSmYNlY';
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(5000, () => console.log('Gemini proxy running on port 5000')); 