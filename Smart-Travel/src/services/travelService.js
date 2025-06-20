export const fetchAttractions = async (city) => {
    try {
        const response = await fetch(`http://localhost:5000/api/attractions/${encodeURIComponent(city)}`);
        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Frontend fetch error:', error);
        throw error;
    }
};
