import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Endpoint to fetch attractions
app.get('/api/attractions/:city', async (req, res) => {
    const { city } = req.params;
    const apiKey = process.env.PLACES_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=attractions+in+${encodeURIComponent(city)}&key=${apiKey}`;
    console.log(`➡️ Fetching URL: ${url}`);

    console.log('PLACES_API_KEY from env:', process.env.PLACES_API_KEY);


    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=attractions+in+${encodeURIComponent(city)}&key=${apiKey}`);
        console.log(`⬅️ Received response with status: ${response.status}`);
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Google API error: ${text}`);
        }

        const data = await response.json();
        console.log('⬅️ Data received from Google Places API:', data);
        const attractions = data.results.slice(0, 5).map(place => ({
            name: place.name,
            rating: place.rating || 'N/A',
            description: place.types ? place.types.join(', ') : 'Attraction',
            image: place.photos
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
                : null
        }));

        res.json(attractions);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
