const MonthCardPlaceholder = () => {
  return (
    <div className="w-full bg-gray-50 p-8 rounded-lg shadow">
        <div className="animate-pulse duration-75 flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        </div>
        <div className="animate-pulse duration-75 flex space-x-4 mt-6">
            <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
            </div>
        </div>
        <div className="animate-pulse mt-6">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
    </div>
  )
}

export default MonthCardPlaceholder
