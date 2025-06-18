import { useState, useEffect } from 'react';
import { Cloud, Newspaper, Calendar, Sparkles, Camera, Star, ArrowLeft, Clock, Wind, Droplets } from 'lucide-react';

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
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg font-medium">Loading your travel information...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Header with back button */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
                <div className="relative px-6 py-8 sm:px-8 lg:px-12">
                    <div className="max-w-7xl mx-auto">
                        <button 
                            onClick={handleGoBack} 
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 mb-6 group"
                        >
                            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                            <span className="font-medium">Back to Search</span>
                        </button>
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 tracking-tight">
                                Travel Results for {travelData?.destination}
                            </h1>
                            <div className="flex items-center justify-center space-x-2">
                                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                                <span className="text-sm text-gray-400 font-medium">AI-Curated Travel Experience</span>
                                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                            </div>
                        </div>
                        <div>
                            <button className= 'absolute top-4 right-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center space-x-2 text-base z-50'
                            onClick={() => {
                                const existing = JSON.parse(localStorage.getItem('savedItinerary') || '[]');
                                const updated = [...existing, travelData];
                                localStorage.setItem('savedItinerary', JSON.stringify(updated));
                                alert("Trip saved successfully!");
                            }}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="relative px-6 sm:px-8 lg:px-12 pb-16">
                <div className="max-w-7xl mx-auto">
                    {travelData && (
                        <div className="space-y-16 animate-fade-in">
                            {/* Weather Card */}
                            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-8">
                                <div className="flex items-center mb-6">
                                    <Cloud className="h-6 w-6 mr-3 text-blue-400" />
                                    <h3 className="text-2xl font-bold text-white">Current Weather in {travelData.destination}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">{travelData.weather.icon}</div>
                                        <div className="text-3xl font-bold text-white mb-1">{travelData.weather.temperature}°C</div>
                                        <div className="text-blue-200 font-medium">{travelData.weather.condition}</div>
                                    </div>
                                    <div className="flex items-center justify-between bg-blue-800/30 rounded-xl p-4">
                                        <div className="flex items-center">
                                            <Droplets className="h-5 w-5 text-blue-400 mr-2" />
                                            <span className="text-gray-300">Humidity</span>
                                        </div>
                                        <span className="text-white font-semibold">{travelData.weather.humidity}%</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-blue-800/30 rounded-xl p-4">
                                        <div className="flex items-center">
                                            <Wind className="h-5 w-5 text-blue-400 mr-2" />
                                            <span className="text-gray-300">Wind Speed</span>
                                        </div>
                                        <span className="text-white font-semibold">{travelData.weather.windSpeed} km/h</span>
                                    </div>
                                    <div className="bg-green-800/30 rounded-xl p-4 text-center">
                                        <div className="text-green-300 font-medium mb-1">Conditions</div>
                                        <div className="text-green-200 text-sm">Perfect for sightseeing!</div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Attractions */}
                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                                <div className="flex items-center mb-8">
                                    <Camera className="h-6 w-6 mr-3 text-purple-400" />
                                    <h3 className="text-2xl font-bold text-white">Top 5 Attractions</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                                    {travelData.attractions.map((attraction, index) => (
                                        <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
                                            <div className="text-center mb-4">
                                                <div className="text-3xl mb-3">{attraction.image}</div>
                                                <h4 className="text-lg font-semibold text-white mb-2">{attraction.name}</h4>
                                                <div className="flex items-center justify-center space-x-1 mb-3">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    <span className="text-white font-semibold">{attraction.rating}</span>
                                                </div>
                                                <p className="text-gray-300 text-sm leading-relaxed">{attraction.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Local News */}
                            <div className="bg-gradient-to-br from-teal-900/30 to-green-800/30 backdrop-blur-sm border border-teal-700/50 rounded-2xl p-8">
                                <div className="flex items-center mb-8">
                                    <Newspaper className="h-6 w-6 mr-3 text-teal-400" />
                                    <h3 className="text-2xl font-bold text-white">Local News & Events</h3>
                                </div>
                                <div className="space-y-4">
                                    {travelData.news.map((headline, index) => (
                                        <div key={index} className="bg-teal-800/30 border border-teal-700/50 rounded-xl p-6 hover:border-teal-600/50 transition-all duration-300">
                                            <p className="text-white font-medium mb-2 leading-relaxed">{headline}</p>
                                            <p className="text-teal-200 text-sm">Just now • Local News</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 7-Day Itinerary */}
                            <div className="bg-gradient-to-br from-green-900/30 to-emerald-800/30 backdrop-blur-sm border border-green-700/50 rounded-2xl p-8">
                                <div className="flex items-center mb-8">
                                    <Calendar className="h-6 w-6 mr-3 text-green-400" />
                                    <h3 className="text-2xl font-bold text-white">Your 7-Day Itinerary</h3>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {travelData.itinerary.map((day, index) => (
                                        <div key={index} className="bg-green-800/30 border border-green-700/50 rounded-xl p-6 hover:border-green-600/50 transition-all duration-300">
                                            <div className="flex items-center mb-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold mr-4">
                                                    {day.day}
                                                </div>
                                                <h4 className="text-lg font-semibold text-white">{day.title}</h4>
                                            </div>
                                            <ul className="space-y-3">
                                                {day.activities.map((activity, actIndex) => (
                                                    <li key={actIndex} className="flex items-start space-x-3">
                                                        <Clock className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-300 text-sm leading-relaxed">{activity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fun Facts */}
                            <div className="bg-gradient-to-br from-purple-900/30 to-pink-800/30 backdrop-blur-sm border border-purple-700/50 rounded-2xl p-8">
                                <div className="flex items-center mb-8">
                                    <Sparkles className="h-6 w-6 mr-3 text-purple-400" />
                                    <h3 className="text-2xl font-bold text-white">Fun Facts About {travelData.destination}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {travelData.funFacts.map((fact, index) => (
                                        <div key={index} className="bg-purple-800/30 border border-purple-700/50 rounded-xl p-6 hover:border-purple-600/50 transition-all duration-300">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                                                <p className="text-gray-300 leading-relaxed">{fact}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
            `}</style>
        </div>
    );
}

export default Results;