export const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    
    // Debug logs
    console.log('Weather API Key exists:', !!apiKey);
    console.log('Fetching weather for city:', city);
    
    if (!apiKey) {
        console.error('Weather API key not found in environment variables');
        throw new Error('Weather API key not configured');
    }

    // Clean up the city parameter - remove country codes if they exist
    let cleanCity = city;
    if (city.includes(',')) {
        cleanCity = city.split(',')[0].trim();
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cleanCity)}&appid=${apiKey}&units=metric`;
    console.log('Weather API URL (without key):', url.replace(apiKey, 'HIDDEN'));

    try {
        const response = await fetch(url);
        console.log('Weather API response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Weather API error response:', errorText);
            
            if (response.status === 401) {
                throw new Error('Invalid API key');
            } else if (response.status === 404) {
                throw new Error(`City "${cleanCity}" not found`);
            } else {
                throw new Error(`Weather API error: ${response.status}`);
            }
        }
        
        const data = await response.json();
        console.log('Weather API response data:', data);

        // Validate the response structure
        if (!data.main || !data.weather || !data.weather[0]) {
            console.error('Invalid weather data structure:', data);
            throw new Error('Invalid weather data received');
        }

        const weatherData = {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            windSpeed: data.wind?.speed || 0
        };

        console.log('Processed weather data:', weatherData);
        return weatherData;
        
    } catch (error) {
        console.error("Weather fetch error:", error);
        
        // If it's already our custom error, re-throw it
        if (error.message.includes('API key') || 
            error.message.includes('not found') || 
            error.message.includes('Weather API error')) {
            throw error;
        }
        
        // For network errors or other issues
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Network error - check your internet connection');
        }
        
        throw new Error('Failed to fetch weather data');
    }
};