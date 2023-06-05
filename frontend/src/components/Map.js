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
        // Generate as JSX for use of Tailwind classes, but return as static markup
        // for addition to popups as HTML
        const content =
            <div className="text-center">
                <strong>{new Date(sightingProperties.date).toLocaleDateString()}</strong><br />
                Count: {sightingProperties.count}<br />
                {sightingProperties.behavior ? `Behavior: ${sightingProperties.behavior}` : null}
            </div>
        return renderToStaticMarkup(content)
    }

    useEffect(() => {
        // Don't create map unless mapVisible=true. mapVisible is always true on 
        // desktop, but on mobile don't create map in a hidden container because
        // it causes issues with styling
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
                    // Map the sightingData values in sightingData in app state to map sources and layers
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

                        // Add popup on hover over point
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
        // When sightingData changes, remove the former layers and sources
        // for the addition of the new sources and layers
        if (map && sightingData) {
            for (const idx in sightingData.length) {
                const sightingsSource = map.getSource(`${idx}-sightings`)
                if (sightingsSource) {
                    map.removeLayer(`${idx}-sightings`)
                    map.removeSource(`${idx}-sightings`)
                }
            }
        }
    }, [map, sightingData])

    useEffect(() => {
        // Implements the month hover effect on desktop. When a month has been
        // selected on the chart, set that layer's style to highlight it
        if (map
            && selectedMonth !== null
            && mapType === "desktop"
            && map.getSource(`${selectedMonth}-sightings`) 
            && map.getLayer(`${selectedMonth}-sightings`)
            ) { 
                setHighlightedMonth(selectedMonth)
                map.setPaintProperty(`${selectedMonth}-sightings`, "circle-color", "#1e40af");
                map.setPaintProperty(`${selectedMonth}-sightings`, "circle-radius", 6);
                map.setPaintProperty(`${selectedMonth}-sightings`, "circle-stroke-width", 0);
        }
    }, [map, selectedMonth, mapType])

    useEffect (() => {
        // Resets the month's layer styling. Moving the mouse off of a month in
        // the chart sets selectedMonth to null. 
        if (map 
            && highlightedMonth !== null
            && mapType === "desktop"
            && selectedMonth !== highlightedMonth 
            && map.getLayer(`${highlightedMonth}-sightings`)
        ) {
            map.setPaintProperty(`${highlightedMonth}-sightings`, "circle-color", "#ffffff");
            map.setPaintProperty(`${highlightedMonth}-sightings`, "circle-radius", 4);
            map.setPaintProperty(`${highlightedMonth}-sightings`, "circle-stroke-width", 1);
            setHighlightedMonth(selectedMonth)
        }
    }, [map, highlightedMonth, selectedMonth, mapType])

    return (
        // Mapbox had trouble rendering in a container with a conditional height,
        // so conditionally return a container with a set height instead
        mapType === "mobile"
            ? <div id={`${mapType}-map-container`} className="h-mobileMap"></div>
            : <div id={`${mapType}-map-container`} className="h-screen"></div>
    )
}

export default Map;