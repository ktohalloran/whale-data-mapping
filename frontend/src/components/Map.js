import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server"

import "mapbox-gl/dist/mapbox-gl.css";

const token = process.env.REACT_APP_MAPBOXKEY
if (token) {mapboxgl.accessToken = token}

const Map = ({sightingData, selectedMonth, mapType, mapVisible}) => {
    const [map, setMap] = useState(null);
    const [highlightedMonth, setHighlightedMonth] = useState(null)

    const getPopUpText = (sightingProperties) => {
        const content =
            <div className="text-center">
                <strong>{new Date(sightingProperties.date).toLocaleDateString()}</strong><br />
                Count: {sightingProperties.count}<br />
                {sightingProperties.behavior ? `Behavior: ${sightingProperties.behavior}` : null}
            </div>
        return renderToStaticMarkup(content)
    }

    useEffect(() => {
        if (mapVisible) {
            const map = new mapboxgl.Map({
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-123.002975, 37.698448],
                zoom: 11,
                container: `${mapType}-map-container`
            });
            if (mapType === "mobile") {
                map.scrollZoom.disable()
                map.addControl(new mapboxgl.NavigationControl());
            }
            setMap(map)

            if (sightingData) {
                map.on("load", () => {
                    sightingData.forEach((sightingByMonth, idx) => {
                        map.addSource(`${idx}-sightings`, {
                            "type": "geojson",
                            "data": sightingByMonth["sightingData"]
                        })
                        map.addLayer({
                            "id": `${idx}-sightings`,
                            "type": "circle",
                            "source": `${idx}-sightings`,
                            "paint": {
                                "circle-radius": 4,
                                "circle-stroke-width": 1,
                                "circle-color": "white",
                                "circle-stroke-color": "#606061"
                            }
                        })

                        const popup = new mapboxgl.Popup({
                            closeButton: false,
                            closeOnClick: false
                        })

                        map.on("mouseenter", `${idx}-sightings`, (event) => {
                            map.getCanvas().style.cursor = "pointer"
                            const coords = event.features[0].geometry.coordinates.slice()
                            const properties = event.features[0].properties
                            const sightingDetails = getPopUpText(properties)
                            popup.setLngLat(coords).setHTML(sightingDetails).addTo(map)
                        })

                        map.on("mouseleave", `${idx}-sightings`, () => {
                            map.getCanvas().style.cursor = ""
                            popup.remove()
                        })
                    })
                })
            }   
        }
    }, [sightingData, mapType, mapVisible])

    useEffect(() => {
        if (map && sightingData) {
            for (const idx in sightingData.length) {
                const sightingsSource = map.getSource(`${idx}-sightings`)
                if (sightingsSource) {
                    map.removeLayer(`${idx}-sightings`)
                    map.removeLayer(`${idx}-month-sightings`)
                    map.removeSource(`${idx}-sightings`)
                }
            }
        }
    }, [map, sightingData])

    useEffect(() => {
        if (map
            && selectedMonth !== null
            && mapType === "desktop"
            && map.getSource(`${selectedMonth}-sightings`) 
            && !map.getLayer(`${selectedMonth}-month-sightings`)
            ) { 
                setHighlightedMonth(selectedMonth)
                map.addLayer({
                    "id": `${selectedMonth}-month-sightings`,
                    "type": "circle",
                    "source": `${selectedMonth}-sightings`,
                    "paint": {
                        "circle-radius": 6,
                        "circle-color": "#1e40af"
                    }
                })
        }
    }, [map, selectedMonth])

    useEffect (() => {
        if (map 
            && selectedMonth !== highlightedMonth 
            && mapType === "desktop"
            && map.getLayer(`${highlightedMonth}-month-sightings`)
        ) {
            map.removeLayer(`${highlightedMonth}-month-sightings`)
            setHighlightedMonth(selectedMonth)
        }
    }, [map, highlightedMonth, selectedMonth])

    return (
        mapType === "mobile"
            ? <div id={`${mapType}-map-container`} className="h-mobileMap"></div>
            : <div id={`${mapType}-map-container`} className="h-screen"></div>
    )
}

export default Map;