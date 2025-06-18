import { useState, useEffect } from 'react';
import { Cloud, Newspaper, Calendar, Sparkles, Camera, Star, ArrowLeft } from 'lucide-react';

function Results() {
    const [travelData, setTravelData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mock data - In real app, this would come from props/state/API
    const mockWeatherData = {
        temperature: 24,
        condition: 'Sunny',
        humidity: 65,
        windSpeed: 12,
        icon: '☀️'
    };

    const mockAttractions = [
        { name: 'Eiffel Tower', rating: 4.6, description: 'Iconic iron lattice tower', image: '🗼' },
        { name: 'Louvre Museum', rating: 4.7, description: 'World\'s largest art museum', image: '🏛️' },
        { name: 'Notre-Dame Cathedral', rating: 4.5, description: 'Medieval Catholic cathedral', image: '⛪' },
        { name: 'Arc de Triomphe', rating: 4.5, description: 'Triumphal arch monument', image: '🏛️' },
        { name: 'Seine River Cruise', rating: 4.4, description: 'Scenic boat tour experience', image: '🚢' }
    ];

    const mockNews = [
        'Local Art Festival Draws Thousands of Visitors This Weekend',
        'New Metro Line Opens, Improving City Transportation',
        'Historic District Receives UNESCO Recognition'
    ];

    const mockItinerary = [
        { day: 1, title: 'Arrival & City Center', activities: ['Check into hotel', 'Walk through historic district', 'Welcome dinner at local bistro'] },
        { day: 2, title: 'Museums & Culture', activities: ['Morning at art museum', 'Lunch at cultural café', 'Afternoon walking tour'] },
        { day: 3, title: 'Food & Markets', activities: ['Local market visit', 'Cooking class experience', 'Evening food tour'] },
        { day: 4, title: 'Nature & Parks', activities: ['Morning hike', 'Picnic lunch', 'Botanical garden visit'] },
        { day: 5, title: 'Architecture Tour', activities: ['Historic building tour', 'Architecture photography', 'Rooftop dinner'] },
        { day: 6, title: 'Local Experiences', activities: ['Community workshop', 'Local artisan visit', 'Traditional performance'] },
        { day: 7, title: 'Departure', activities: ['Final shopping', 'Last-minute sightseeing', 'Airport departure'] }
    ];

    useEffect(() => {
        // Simulate loading data - replace with actual data fetching
        const loadData = () => {
            setTimeout(() => {
                setTravelData({
                    destination: "Paris", // This would come from navigation params/state
                    weather: mockWeatherData,
                    attractions: mockAttractions,
                    news: mockNews,
                    itinerary: mockItinerary,
                    funFacts: [
                        "Paris has over 2,000 years of recorded history",
                        "The city is home to more than 130 museums and galleries",
                        "Local cuisine features over 400 traditional dishes"
                    ]
                });
                setIsLoading(false);
            }, 1000);
        };

        loadData();
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem('travelData');
        if (stored) {
            setTravelData(JSON.parse(stored));
        }
    }, []);

    if (!travelData) {
        return <p className="text-white text-center mt-10">No travel data available. Please perform a search first.</p>;
    }

    const handleGoBack = () => {
        // Navigation logic - replace with your routing solution
        window.history.back();
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your travel information...</p>
            </div>
        );
    }

    return (
        <div className="results-container">
            {/* Header with back button */}
            <header className="results-header">
                <div className="header-content">
                    <button onClick={handleGoBack} className="back-button">
                        <ArrowLeft />
                        <span>Back to Search</span>
                    </button>
                    <h1>Travel Results for {travelData?.destination}</h1>
                </div>
            </header>

            <div className="main-content">
                {travelData && (
                    <div className="results-grid">
                        {/* Weather Card */}
                        <div className="weather-card">
                            <div className="card-header">
                                <Cloud />
                                <h3>Current Weather in {travelData.destination}</h3>
                            </div>
                            <div className="weather-grid">
                                <div className="weather-item">
                                    <div className="weather-icon">{travelData.weather.icon}</div>
                                    <div className="weather-temp">{travelData.weather.temperature}°C</div>
                                    <div className="weather-condition">{travelData.weather.condition}</div>
                                </div>
                                <div className="weather-item">
                                    <div className="weather-label">Humidity</div>
                                    <div className="weather-value">{travelData.weather.humidity}%</div>
                                </div>
                                <div className="weather-item">
                                    <div className="weather-label">Wind Speed</div>
                                    <div className="weather-value">{travelData.weather.windSpeed} km/h</div>
                                </div>
                                <div className="weather-item">
                                    <div className="weather-label">Conditions</div>
                                    <div className="weather-desc">Perfect for sightseeing!</div>
                                </div>
                            </div>
                        </div>

                        {/* Top Attractions */}
                        <div className="attractions-card">
                            <div className="card-header">
                                <Camera />
                                <h3>Top 5 Attractions</h3>
                            </div>
                            <div className="attractions-grid">
                                {travelData.attractions.map((attraction, index) => (
                                    <div key={index} className="attraction-item">
                                        <div className="attraction-icon">{attraction.image}</div>
                                        <h4 className="attraction-name">{attraction.name}</h4>
                                        <div className="attraction-rating">
                                            <Star />
                                            <span>{attraction.rating}</span>
                                        </div>
                                        <p className="attraction-description">{attraction.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Local News */}
                        <div className="news-card">
                            <div className="card-header">
                                <Newspaper />
                                <h3>Local News & Events</h3>
                            </div>
                            <div className="news-list">
                                {travelData.news.map((headline, index) => (
                                    <div key={index} className="news-item">
                                        <p className="news-headline">{headline}</p>
                                        <p className="news-time">Just now • Local News</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 7-Day Itinerary */}
                        <div className="itinerary-card">
                            <div className="card-header">
                                <Calendar />
                                <h3>Your 7-Day Itinerary</h3>
                            </div>
                            <div className="itinerary-grid">
                                {travelData.itinerary.map((day, index) => (
                                    <div key={index} className="itinerary-day">
                                        <div className="day-header">
                                            <div className="day-number">{day.day}</div>
                                            <h4 className="day-title">{day.title}</h4>
                                        </div>
                                        <ul className="activity-list">
                                            {day.activities.map((activity, actIndex) => (
                                                <li key={actIndex} className="activity-item">
                                                    <span className="activity-bullet"></span>
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fun Facts */}
                        <div className="fun-facts-card">
                            <div className="card-header">
                                <Sparkles />
                                <h3>Fun Facts About {travelData.destination}</h3>
                            </div>
                            <div className="fun-facts-grid">
                                {travelData.funFacts.map((fact, index) => (
                                    <div key={index} className="fun-fact-item">
                                        <p>{fact}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Results;