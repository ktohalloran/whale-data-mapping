import React from "react";

const MobileMapToggle = ({mapVisible, setMapVisibleMethod}) => {
    return (
        <div 
            className="mobileMapToggle"
            onClick={() => {
                setMapVisibleMethod(!mapVisible)
            }}
        >
            {mapVisible 
                ? <span>&larr; View Chart</span> 
                : <span> View Map &rarr;</span>}
        </div>
    )
}

export default MobileMapToggle;