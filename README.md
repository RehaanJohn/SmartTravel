# Smart Travel App 🌍

A full-stack travel planning application that provides AI-curated travel experiences with real-time weather, attractions, news, and fun facts for destinations worldwide.

## 🚀 Features

- **Real-time Weather Data** - Current weather conditions for your destination
- **Top Attractions** - Curated list of must-visit places with ratings and photos
- **Local News** - Stay updated with recent news from your travel destination
- **Fun Facts** - Discover interesting facts about cities around the world
- **Travel Itinerary** - AI-generated day-by-day travel plans
- **Responsive Design** - Modern, mobile-friendly interface with dark theme
- **Save Trips** - Bookmark your favorite travel plans

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Axios** - HTTP client for API requests

### APIs
- **OpenWeatherMap** - Weather data
- **News API** - News articles
- **Google Places API** - Attractions and places data

## 📁 Project Structure

```
Smart-Travel/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── currentItinerary.jsx
│   │   ├── funfacts.jsx
│   │   └── Results.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Itinerary.jsx
│   │   └── Results.jsx
│   ├── services/
│   │   ├── newsService.js
│   │   ├── travelService.js
│   │   └── weatherService.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- API keys for external services

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Smart-Travel
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Add your API keys to .env file

# Start the backend server
node server.js
```

### 3. Frontend Setup
```bash
# Navigate back to root directory
cd ..

# Install frontend dependencies
npm install

# Add your API keys to .env file

# Start the development server
npm run dev
```

The application will be available at:
`http://localhost:5173`

## 🔑 API Keys Setup

### OpenWeatherMap API
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add to your `.env` file as `OPENWEATHER_API_KEY`

### News API
1. Visit [News API](https://newsapi.org/)
2. Sign up for a free account
3. Generate an API key
4. Add to your `.env` file as `NEWS_API_KEY`

### Google Places API
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the Places API
4. Create credentials (API key)
5. Add to your `.env` file as `GOOGLE_PLACES_API_KEY`

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "axios": "^1.5.0",
  "node-fetch": "^3.3.2"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.15.0",
  "lucide-react": "^0.263.1"
}
```
