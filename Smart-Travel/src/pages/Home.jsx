import { useState, useEffect } from 'react';
import { Search, MapPin, Sparkles, Plane, Cloud, Sun, Wind, Droplets, Star, Calendar, Clock, Globe, Compass } from 'lucide-react';
import '../index.css';
import {useNavigate} from 'react-router-dom';
import Results from './Result';


function Home() {

    const navigate = useNavigate();

    const [destination, setDestination] = useState('');
    const [interests, setInterests] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [travelData, setTravelData] = useState(null);
    const [showResults, setShowResults] = useState(false);

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

        setShowResults(false); 
        setIsLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            const data = {
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
            };

            localStorage.setItem('travelData', JSON.stringify(data));
            setTravelData(data);
            setIsLoading(false);

            // ✅ Navigate to new page
            navigate('/results');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Header */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
                <div className="relative px-6 py-16 sm:px-8 lg:px-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-6">
                                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25">
                                    <Globe className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 tracking-tight">
                                GlobeTrotter AI
                            </h1>
                            <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                                Your Virtual Travel Assistant
                            </p>
                            <div className="mt-8 flex items-center justify-center space-x-2">
                                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                                <span className="text-sm text-gray-400 font-medium">Powered by Artificial Intelligence</span>
                                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="relative px-6 sm:px-8 lg:px-12 pb-16">
                {/* Search Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Where would you like to explore?
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Enter your dream destination and let AI plan your perfect trip
                        </p>
                    </div>
                    
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
                        <div className="space-y-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter destination (e.g., Paris, Tokyo, New York)"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg font-medium"
                                />
                            </div>
                            
                            <button
                                onClick={handleSearch}
                                disabled={isLoading || !destination.trim()}
                                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 disabled:from-gray-700 disabled:via-gray-700 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center space-x-3 text-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Planning your adventure...</span>
                                    </>
                                ) : (
                                    <>
                                        <Search className="h-5 w-5" />
                                        <span>Explore Destination</span>
                                        <Compass className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ✅ Render Results if ready */}
                    {showResults && travelData && (
                        <Results
                            travelData={travelData}
                            destination={destination}
                            interests={interests}
                        />
                    )}
                </div>
            </div>
        </div>

    );
}

export default Home;