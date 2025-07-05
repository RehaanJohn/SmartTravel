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

const funFactsData = {
    paris: [
        "Paris was originally a Roman city called 'Lutetia'.",
        "It's illegal to take a photo of the Eiffel Tower at night (technically!).",
        "Paris has only one stop sign in the entire city."
    ],
    tokyo: [
        "Tokyo was once known as Edo.",
        "It is the most populous metropolitan area in the world.",
        "Tokyo has more Michelin-starred restaurants than any other city."
    ],
    "new york": [
        "New York was the first capital of the United States.",
        "The city's Federal Reserve Bank has the largest gold storage.",
        "Times Square is named after The New York Times."
    ],
    london: [
        "London has over 170 museums.",
        "Big Ben is not the name of the clock; it's the bell.",
        "The London Underground is the oldest metro system in the world."
    ],
    rome: [
        "Rome has a museum dedicated entirely to pasta.",
        "Cats are free to roam anywhere in Rome, including historical ruins.",
        "St. Peter's Basilica is the largest church ever constructed."
    ],
    barcelona: [
        "Barcelona's beaches are artificial; they were created for the 1992 Olympics.",
        "The Sagrada Família has been under construction since 1882.",
        "It's the only city awarded a Royal Gold Medal for architecture."
    ],
    amsterdam: [
        "Amsterdam has more bikes than people.",
        "It has 165 canals that total more than 100 kilometers.",
        "The city is built on wooden piles."
    ],
    berlin: [
        "Berlin has more bridges than Venice.",
        "It's nine times bigger than Paris.",
        "The Berlin Zoo has the most species in the world."
    ]
};

app.get('/api/funfacts/:city', (req, res) => {
    const { city } = req.params;
    
    // Normalize the city name to lowercase and handle common variations
    const normalizedCity = city.toLowerCase().trim();
    
    // Try exact match first
    let facts = funFactsData[normalizedCity];
    
    // If no exact match, try some common variations
    if (!facts) {
        // Try removing common prefixes/suffixes
        const variations = [
            normalizedCity.replace(/^the\s+/i, ''), // Remove "the" prefix
            normalizedCity.replace(/\s+city$/i, ''), // Remove "city" suffix
            normalizedCity.split(',')[0], // Take only the first part before comma
            normalizedCity.split('-')[0]  // Take only the first part before dash
        ];
        
        for (const variation of variations) {
            if (funFactsData[variation]) {
                facts = funFactsData[variation];
                break;
            }
        }
    }

    if (facts) {
        res.json({ city, facts });
    } else {
        // Return a more helpful error with available cities
        const availableCities = Object.keys(funFactsData);
        res.status(404).json({ 
            error: `No fun facts found for "${city}". Available cities: ${availableCities.join(', ')}`,
            availableCities 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
