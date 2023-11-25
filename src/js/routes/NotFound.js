const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-2">404 - Not Found</h1>
                <p className="text-sm sm:text-xl text-gray-600 mb-4">죄송합니다. URL을 다시 확인해 주세요.</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="w-16 h-16 sm:w-32 sm:h-32 mx-auto">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
        </div>
    )
}

export default NotFound