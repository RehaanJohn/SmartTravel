import { useState, useEffect } from 'react';
import { Cloud, Newspaper, Calendar, Sparkles, Camera, Star, ArrowLeft, Clock, Wind, Droplets } from 'lucide-react';
import { fetchWeather } from '../services/weatherService';
import { fetchAttractions } from '../services/travelService';
import { useLocation } from 'react-router-dom';

function Results() {
    const [travelData, setTravelData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [weather, setWeather] = useState(null);
    const [weatherError, setWeatherError] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [attractions, setAttractions] = useState(null);
    const [attractionsLoading, setAttractionsLoading] = useState(false);
    const [attractionsError, setAttractionsError] = useState(null);

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const cityParam = query.get('city');

    useEffect(() => {
        // Load travel data from localStorage
        const stored = localStorage.getItem('travelData');
        if (stored) {
            const data = JSON.parse(stored);
            setTravelData(data);
            
            // Fetch weather and attractions
            const cityForWeather = cityParam || data.citySearchName || data.destination;
            const cityForAttractions = data.destination; // Use clean city name for attractions
            
            console.log('City for weather lookup:', cityForWeather);
            console.log('City for attractions lookup:', cityForAttractions);
            
            if (cityForWeather) {
                fetchWeatherData(cityForWeather);
            }
            
            if (cityForAttractions) {
                fetchAttractionsData(cityForAttractions);
            }
        }
        setIsLoading(false);
    }, [cityParam]);

    const fetchWeatherData = async (city) => {
        setWeatherLoading(true);
        setWeatherError(null);
        try {
            console.log('Fetching weather for:', city);
            const result = await fetchWeather(city);
            console.log('Weather result:', result);
            if (result) {
                setWeather(result);
            } else {
                console.error("Failed to fetch weather data for:", city);
                setWeatherError("Failed to fetch weather data");
            }
        } catch (error) {
            console.error("Weather fetch error:", error);
            setWeatherError(error.message || "Weather fetch failed");
        } finally {
            setWeatherLoading(false);
        }
    };

    const fetchAttractionsData = async (city) => {
        setAttractionsLoading(true);
        setAttractionsError(null);
        try {
            console.log('Fetching attractions for:', city);
            const result = await fetchAttractions(city);
            console.log('Attractions result:', result);
            if (result && result.length > 0) {
                setAttractions(result);
            } else {
                setAttractionsError("No attractions found");
            }
        } catch (error) {
            console.error("Attractions fetch error:", error);
            setAttractionsError(error.message || "Failed to fetch attractions");
        } finally {
            setAttractionsLoading(false);
        }
    };

    const handleGoBack = () => {
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

    if (!travelData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-xl mb-4">No travel data available.</p>
                    <p className="text-gray-400 mb-6">Please perform a search first.</p>
                    <button 
                        onClick={handleGoBack}
                        className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                    >
                        Go Back to Search
                    </button>
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
                            <button className='absolute top-4 right-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center space-x-2 text-base z-50'
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
                    <div className="space-y-16 animate-fade-in">
                        {/* Weather Card */}
                        <div className="text-white p-6">
                            <h2 className="text-2xl font-bold mb-4">Weather in {travelData.destination}</h2>

                            {weatherLoading ? (
                                <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 shadow-xl w-fit">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                                        <p className="text-white">Loading weather...</p>
                                    </div>
                                </div>
                            ) : weatherError ? (
                                <div className="bg-gray-900/50 border border-red-700 rounded-2xl p-6 shadow-xl w-fit">
                                    <p className="text-red-400">⚠️ Weather Error: {weatherError}</p>
                                    <button 
                                        onClick={() => fetchWeatherData(cityParam || travelData.citySearchName || travelData.destination)}
                                        className="mt-2 text-blue-400 hover:text-blue-300 underline text-sm"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : weather ? (
                                <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 shadow-xl w-fit">
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <p className="text-lg">🌡 Temperature: {Math.round(weather.temperature)}°C</p>
                                            <p className="text-lg">🌤 Condition: {weather.condition}</p>
                                            <p className="text-lg">💨 Wind Speed: {Math.round(weather.windSpeed)} km/h</p>
                                            <p className="text-lg">💧 Humidity: {weather.humidity}%</p>
                                        </div>
                                        {weather.icon && (
                                            <img
                                                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                                alt={weather.condition}
                                                className="w-16 h-16"
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 shadow-xl w-fit">
                                    <p className="text-gray-400">No weather data available</p>
                                </div>
                            )}
                        </div>

                        {/* Top Attractions - Now using Google Places API */}
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                            <div className="flex items-center mb-8">
                                <Camera className="h-6 w-6 mr-3 text-purple-400" />
                                <h3 className="text-2xl font-bold text-white">Top 5 Attractions</h3>
                                {attractionsLoading && (
                                    <div className="ml-4 w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                                )}
                            </div>
                            
                            {attractionsError ? (
                                <div className="bg-red-900/20 border border-red-700 rounded-xl p-6 mb-6">
                                    <p className="text-red-400">⚠️ {attractionsError}</p>
                                    <button 
                                        onClick={() => fetchAttractionsData(travelData.destination)}
                                        className="mt-2 text-blue-400 hover:text-blue-300 underline text-sm"
                                    >
                                        Try Again
                                    </button>
                                    <p className="text-gray-400 text-sm mt-2">Showing fallback attractions below:</p>
                                </div>
                            ) : null}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                                {(attractions || travelData.attractions).map((attraction, index) => (
                                    <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
                                        <div className="text-center mb-4">
                                            {attraction.image && attraction.image.startsWith('http') ? (
                                                <img 
                                                    src={attraction.image} 
                                                    alt={attraction.name}
                                                    className="w-full h-32 object-cover rounded-lg mb-3"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                            ) : null}
                                            <div className="text-3xl mb-3" style={{display: attraction.image && attraction.image.startsWith('http') ? 'none' : 'block'}}>
                                                {attraction.image || '📍'}
                                            </div>
                                            <h4 className="text-lg font-semibold text-white mb-2">{attraction.name}</h4>
                                            <div className="flex items-center justify-center space-x-1 mb-3">
                                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                <span className="text-white font-semibold">{attraction.rating}</span>
                                            </div>
                                            <p className="text-gray-300 text-sm leading-relaxed">{attraction.description}</p>
                                            {attraction.address && (
                                                <p className="text-gray-400 text-xs mt-2">📍 {attraction.address}</p>
                                            )}
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