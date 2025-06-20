import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Sparkles, Globe, Compass, ChevronDown } from 'lucide-react';
import '../index.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);
    const inputRef = useRef(null);

    // Popular cities list
    const popularCities = [
        { name: 'Paris', country: 'France', searchName: 'Paris,FR' },
        { name: 'Tokyo', country: 'Japan', searchName: 'Tokyo,JP' },
        { name: 'New York', country: 'United States', searchName: 'New York,US' },
        { name: 'London', country: 'United Kingdom', searchName: 'London,GB' },
        { name: 'Rome', country: 'Italy', searchName: 'Rome,IT' },
        { name: 'Barcelona', country: 'Spain', searchName: 'Barcelona,ES' },
        { name: 'Amsterdam', country: 'Netherlands', searchName: 'Amsterdam,NL' },
        { name: 'Berlin', country: 'Germany', searchName: 'Berlin,DE' },
        { name: 'Prague', country: 'Czech Republic', searchName: 'Prague,CZ' },
        { name: 'Vienna', country: 'Austria', searchName: 'Vienna,AT' },
        { name: 'Istanbul', country: 'Turkey', searchName: 'Istanbul,TR' },
        { name: 'Dubai', country: 'UAE', searchName: 'Dubai,AE' },
        { name: 'Bangkok', country: 'Thailand', searchName: 'Bangkok,TH' },
        { name: 'Singapore', country: 'Singapore', searchName: 'Singapore,SG' },
        { name: 'Sydney', country: 'Australia', searchName: 'Sydney,AU' },
        { name: 'Cairo', country: 'Egypt', searchName: 'Cairo,EG' },
        { name: 'Mumbai', country: 'India', searchName: 'Mumbai,IN' },
        { name: 'Seoul', country: 'South Korea', searchName: 'Seoul,KR' },
        { name: 'São Paulo', country: 'Brazil', searchName: 'São Paulo,BR' },
        { name: 'Mexico City', country: 'Mexico', searchName: 'Mexico City,MX' },
        { name: 'Los Angeles', country: 'United States', searchName: 'Los Angeles,US' },
        { name: 'Miami', country: 'United States', searchName: 'Miami,US' },
        { name: 'Las Vegas', country: 'United States', searchName: 'Las Vegas,US' },
        { name: 'Montreal', country: 'Canada', searchName: 'Montreal,CA' },
        { name: 'Vancouver', country: 'Canada', searchName: 'Vancouver,CA' },
    ];

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

    // Handle input changes and filter cities
    const handleInputChange = (e) => {
        const value = e.target.value;
        setDestination(value);
        
        if (value.length > 0) {
            const filtered = popularCities.filter(city => 
                city.name.toLowerCase().includes(value.toLowerCase()) ||
                city.country.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCities(filtered);
            setShowSuggestions(true);
        } else {
            setFilteredCities([]);
            setShowSuggestions(false);
        }
    };

    // Handle city selection
    const handleCitySelect = (city) => {
        setDestination(city.name);
        setShowSuggestions(false);
        setFilteredCities([]);
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = async () => {
        if (!destination.trim()) return;

        // Find the selected city to get the proper search name
        const selectedCity = popularCities.find(city => 
            city.name.toLowerCase() === destination.toLowerCase()
        );

        setIsLoading(true);

        setTimeout(() => {
            const data = {
                destination: destination,
                citySearchName: selectedCity ? selectedCity.searchName : destination, // For weather API
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
            setIsLoading(false);
            navigate(`/results?city=${encodeURIComponent(selectedCity ? selectedCity.searchName : destination)}`);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
                <div className="relative px-6 py-16 sm:px-8 lg:px-12">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25">
                                <Globe className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 mb-4">
                            GlobeTrotter AI
                        </h1>
                        <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">Your Virtual Travel Assistant</p>
                        <div className="mt-8 flex items-center justify-center space-x-2">
                            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                            <span className="text-sm text-gray-400 font-medium">Powered by Artificial Intelligence</span>
                            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                        </div>
                    </div>
                </div>
                <button 
                    className='absolute top-4 right-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-base z-50'
                    onClick={() => navigate('/itinerary')}
                >
                    Current Itinerary
                </button>
            </header>

            <div className="relative px-6 sm:px-8 lg:px-12 pb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Where would you like to explore?</h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">Start typing to see popular destinations</p>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
                        <div className="space-y-6">
                            <div className="relative" ref={inputRef}>
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Start typing a city name..."
                                    value={destination}
                                    onChange={handleInputChange}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    onFocus={() => {
                                        if (destination && filteredCities.length > 0) {
                                            setShowSuggestions(true);
                                        }
                                    }}
                                    className="w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-lg font-medium"
                                />
                                
                                {/* Suggestions Dropdown */}
                                {showSuggestions && filteredCities.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                                        {filteredCities.slice(0, 8).map((city, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleCitySelect(city)}
                                                className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between border-b border-gray-700 last:border-b-0"
                                            >
                                                <div>
                                                    <div className="text-white font-medium">{city.name}</div>
                                                    <div className="text-gray-400 text-sm">{city.country}</div>
                                                </div>
                                                <MapPin className="h-4 w-4 text-gray-500" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleSearch}
                                disabled={isLoading || !destination.trim()}
                                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 disabled:bg-gray-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 text-lg"
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

                        {/* Popular Destinations Preview */}
                        {!destination && (
                            <div className="mt-8 pt-6 border-t border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Popular Destinations</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {popularCities.slice(0, 8).map((city, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleCitySelect(city)}
                                            className="text-left p-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-600 hover:bg-gray-800/70 transition-all duration-200"
                                        >
                                            <div className="text-white font-medium text-sm">{city.name}</div>
                                            <div className="text-gray-400 text-xs">{city.country}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;