function CurrentItinerary({ travelData }) {
    if (!travelData) return null;

    return (
        <div>
            <h2 className="text-2xl font-bold text-purple-300 mb-3">{travelData.destination}</h2>

            <div className="mb-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Itinerary</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    {travelData.itinerary.map((day, idx) => (
                        <li key={idx}>
                            <span className="font-semibold text-white">Day {day.day}:</span> {day.title}
                            <ul className="ml-6 list-circle text-sm text-gray-400 mt-1">
                                {day.activities.map((activity, i) => (
                                    <li key={i}>{activity}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CurrentItinerary;
