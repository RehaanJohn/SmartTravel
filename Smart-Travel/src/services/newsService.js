// services/newsService.js

const NEWS_API_KEY = import.meta.env.VITE_NEWSAPI_KEY
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

/**
 * Fetch news articles for a specific city/location
 * @param {string} city - The city name to search news for
 * @param {number} pageSize - Number of articles to fetch (default: 5)
 * @returns {Promise<Array>} Array of news articles
 */
export const fetchNews = async (city, pageSize = 5) => {
    try {
        // Construct search query - focusing on the city and travel/tourism related news
        const searchQuery = `${city} OR "${city} tourism" OR "${city} travel" OR "${city} events"`;
        
        const url = new URL(`${NEWS_API_BASE_URL}/everything`);
        url.searchParams.append('q', searchQuery);
        url.searchParams.append('pageSize', pageSize.toString());
        url.searchParams.append('sortBy', 'relevancy');
        url.searchParams.append('language', 'en');
        url.searchParams.append('apiKey', NEWS_API_KEY);

        console.log('Fetching news from:', url.toString());

        const response = await fetch(url.toString());
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your NewsAPI key.');
            } else if (response.status === 426) {
                throw new Error('NewsAPI requires HTTPS in production.');
            } else if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            } else {
                throw new Error(`NewsAPI error: ${response.status} ${response.statusText}`);
            }
        }

        const data = await response.json();
        
        if (data.status !== 'ok') {
            throw new Error(data.message || 'Failed to fetch news');
        }

        // Filter and format articles
        const articles = data.articles
            .filter(article => 
                article.title && 
                article.title !== '[Removed]' && 
                article.description && 
                article.description !== '[Removed]' &&
                article.url
            )
            .map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                source: article.source.name,
                publishedAt: article.publishedAt,
                urlToImage: article.urlToImage
            }));

        console.log(`Found ${articles.length} news articles for ${city}`);
        return articles;

    } catch (error) {
        console.error('Error fetching news:', error);
        
        // Return fallback news data
        return getFallbackNews(city);
    }
};

/**
 * Get top headlines for a specific country (optional feature)
 * @param {string} country - Country code (e.g., 'us', 'uk', 'in')
 * @param {number} pageSize - Number of articles to fetch
 * @returns {Promise<Array>} Array of news articles
 */
export const fetchTopHeadlines = async (country = 'us', pageSize = 10) => {
    try {
        const url = new URL(`${NEWS_API_BASE_URL}/top-headlines`);
        url.searchParams.append('country', country);
        url.searchParams.append('pageSize', pageSize.toString());
        url.searchParams.append('apiKey', NEWS_API_KEY);

        const response = await fetch(url.toString());
        
        if (!response.ok) {
            throw new Error(`NewsAPI error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.status !== 'ok') {
            throw new Error(data.message || 'Failed to fetch headlines');
        }

        return data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            source: article.source.name,
            publishedAt: article.publishedAt,
            urlToImage: article.urlToImage
        }));

    } catch (error) {
        console.error('Error fetching headlines:', error);
        return [];
    }
};

/**
 * Fallback news data when API fails
 * @param {string} city - The city name
 * @returns {Array} Array of fallback news items
 */
const getFallbackNews = (city) => {
    return [
        {
            title: `Welcome to ${city}! Plan Your Perfect Visit`,
            description: `Discover the best attractions, restaurants, and experiences ${city} has to offer.`,
            source: 'Travel Guide',
            publishedAt: new Date().toISOString(),
            url: null
        },
        {
            title: `${city} Weather and Travel Tips`,
            description: `Check current weather conditions and get helpful travel tips for your visit to ${city}.`,
            source: 'Travel Advisory',
            publishedAt: new Date().toISOString(),
            url: null
        },
        {
            title: `Top Things to Do in ${city}`,
            description: `From must-see landmarks to hidden gems, explore what makes ${city} special.`,
            source: 'Tourism Board',
            publishedAt: new Date().toISOString(),
            url: null
        }
    ];
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatNewsDate = (dateString) => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
            });
        }
    } catch (error) {
        return 'Recently';
    }
};