const MobileMapToggle = ({mapVisible, setMapVisibleMethod, setSelectedMonthMethod}) => {
    return (
        <div 
            className={"bg-slate-200 rounded-lg max-w-fit h-10 p-2 text-sm text-light-gray border-1 cursor-pointer border-gray-300 border-solid"}
            onClick={() => {
                setMapVisibleMethod(!mapVisible)
                // Don't show highlighted sightings on map on mobile
                setSelectedMonthMethod(null)
            }}
        >
            {mapVisible 
                ? <span>&larr; View Chart</span> 
                : <span> View Map &rarr;</span>}
        </div>
    )
}

export default MobileMapToggle;