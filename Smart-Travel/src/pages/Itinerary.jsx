import React, { useEffect, useState } from 'react';
import CurrentItinerary from '../components/currentItinerary';

function Itinerary() {
    const [savedTrips, setSavedTrips] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedItinerary') || '[]');
        setSavedTrips(saved);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-bold mb-6">Your Saved Itineraries</h1>

            {savedTrips.length === 0 ? (
                <p>No saved itineraries yet.</p>
            ) : (
                savedTrips.map((trip, index) => (
                    <div key={index} className="mb-10 border-b border-gray-700 pb-6">
                        <CurrentItinerary travelData={trip} />
                    </div>
                ))
            )}
        </div>
    );
}

export default Itinerary;
