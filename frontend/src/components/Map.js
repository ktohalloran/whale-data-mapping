import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";

const token = process.env.REACT_APP_MAPBOXKEY
if (token) {mapboxgl.accessToken = token}

const Map = ({sightingData}) => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-123.002975, 37.698448],
            zoom: 11,
            container: "map-container"
        });
        setMap(map)

        if (sightingData) {
            map.on("load", () => {
                sightingData.map((sightingByMonth, idx) => {
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
                })
            })
        }
    }, [sightingData])

    useEffect(() => {
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

    return <div id="map-container" className="h-screen"></div>
}

export default Map;