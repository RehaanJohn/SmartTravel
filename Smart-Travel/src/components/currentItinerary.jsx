function CurrentItinerary({ travelData }) {
    if (!travelData) return null;

    return (
        <div>
            <h2 className="text-2xl font-semibold text-purple-300">{travelData.destination}</h2>
            
            <div className="mt-4">
                <h3 className="text-xl font-bold text-blue-300">Itinerary:</h3>
                <ul className="list-disc pl-6 mt-2">
                    {travelData.itinerary.map((day, idx) => (
                        <li key={idx}>
                            <strong>Day {day.day}: {day.title}</strong>
                            <ul className="ml-4 list-square">
                                {day.activities.map((activity, i) => (
                                    <li key={i}>{activity}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h4 className="text-lg font-semibold text-teal-300">Fun Facts:</h4>
                <ul className="list-disc pl-6">
                    {travelData.funFacts.map((fact, i) => (
                        <li key={i}>{fact}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CurrentItinerary;
