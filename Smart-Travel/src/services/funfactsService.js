export const fetchFunFacts = async (city) => {
    try {
        const response = await fetch(`http://localhost:5000/api/funfacts/${encodeURIComponent(city)}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data.facts;
    } catch (error) {
        console.error("Fun facts fetch error:", error);
        throw new Error('Failed to fetch fun facts');
    }
};