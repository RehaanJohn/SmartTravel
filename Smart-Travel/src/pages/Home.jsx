import { useState, useEffect } from 'react';
import { Search, MapPin, Sparkles, Plane } from 'lucide-react';

function Home() {
    const [destination, setDestination] = useState('');
    const [interests, setInterests] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [travelData, setTravelData] = useState(null);

    // Mock data 
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

    const handleSearch = async () => {
        if (!destination.trim()) return;
        
        setIsLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            setTravelData({
                destination: destination,
                weather: mockWeatherData,
                attractions: mockAttractions,
                news: mockNews,
                itinerary: mockItinerary,
                funFacts: [
                    `${destination} has over 2,000 years of recorded history`,
                    `The city is home to more than 130 museums and galleries`,
                    `Local cuisine features over 400 traditional dishes`
                ]
            });
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div>
            {/* Header */}
            <header>
                <div>
                    <div>
                        <div>
                            <h1>GlobeTrotter AI</h1>
                            <p>Your Virtual Travel Assistant</p>
                        </div>
                    </div>
                </div>
            </header>

            <div>
                {/* Search Section */}
                <div>
                    <div>
                        <h2>Where would you like to explore?</h2>
                        <p>Enter your dream destination and let AI plan your perfect trip</p>
                    </div>
                    
                    <div>
                        <div>
                            <MapPin />
                            <input
                                type="text"
                                placeholder="Enter destination (e.g., Paris, Tokyo, New York)"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                        
                        
                        <button
                            onClick={handleSearch}
                            disabled={isLoading || !destination.trim()}
                        >
                            {isLoading ? (
                                <>
                                    <div></div>
                                    Planning your adventure...
                                </>
                            ) : (
                                <>
                                    <Search />
                                    Explore Destination
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;