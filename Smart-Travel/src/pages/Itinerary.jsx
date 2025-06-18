import React, { use, useEffect, useState } from 'react';
import CurrentItinerary from '../components/currentItinerary';
import { Navigate, useNavigate } from 'react-router-dom';

function Itinerary() {
    const [savedTrips, setSavedTrips] = useState([]);

    const Navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedItinerary') || '[]');
        setSavedTrips(saved);
    }, []);

    const deleteTrip = (indexToDelete) => {
        const updatedTrips = savedTrips.filter((_, index) => index !== indexToDelete);
        setSavedTrips(updatedTrips);
        localStorage.setItem('savedItinerary', JSON.stringify(updatedTrips));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 px-6 md:px-16 lg:px-32">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-purple-400 mb-2 tracking-wide">Your Saved Itineraries</h1>
                <p className="text-gray-400 text-lg">Explore all your planned trips below</p>
            </div>

            {savedTrips.length === 0 ? (
                <div className="text-center mt-24">
                    <p className="text-xl text-gray-500">No saved itineraries yet.</p>
                    <p className="text-sm text-gray-600 mt-2">Go back to explore and save a destination first.</p>
                </div>
            ) : (
                <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                    {savedTrips.map((trip, index) => (
                        <div
                            key={index}
                            className="relative group bg-gray-800/60 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-purple-700/20 transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <button
                                onClick={() => deleteTrip(index)}
                                className="absolute top-3 right-3 text-sm text-red-400 border border-red-400 rounded-full px-3 py-1 hover:bg-red-500 hover:text-white transition duration-200"
                            >
                                Delete
                            </button>

                            <CurrentItinerary travelData={trip} />
                        </div>
                    ))}
                </div>
            )}
            <div>
                <button className='absolute top-4 right-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center space-x-2 text-base z-50'
                onClick={() => Navigate('/')}>
                    Back to Home

                </button>
            </div>
        </div>
    );
}

export default Itinerary;
