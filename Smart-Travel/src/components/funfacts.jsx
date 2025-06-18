function Fun() {
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
}

export default Fun; 