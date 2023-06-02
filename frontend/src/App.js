import React, {useEffect, useState} from "react";
import Selector from "./components/Selector";
import Chart from "./components/Chart";
import Map from "./components/Map";

import "mapbox-gl/dist/mapbox-gl.css";
import MobileMapToggle from "./components/MobileMapToggle";

  const isWindowNarrow = (width) => {
    // Tailwind's default minimum screen size for large screens
    return width < 1024
  }

function App() {
  const [speciesList, setSpeciesList] = useState(null);
  const [yearsList, setYearsList] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [whaleData, setWhaleData] = useState(null);
  const [mobileMapVisible, setMobileMapVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchYearAndSpeciesLists = async () => {
      const response = await fetch("/api/sightings")
      const responseJson = await response.json()
      setSpeciesList(responseJson["species"])
      setYearsList(responseJson["years"])
    }
    fetchYearAndSpeciesLists().catch(console.error)
  }, [])

  useEffect(() => {
    if (selectedSpecies && selectedYear) {
      const fetchSightings = async () => {
        const response = await fetch(`/api/sightings?species=${selectedSpecies}&year=${selectedYear}`)
        const responseJson = await response.json()
        setWhaleData(responseJson)
      }
      fetchSightings().catch(console.error)
    }
  }, [selectedSpecies, selectedYear])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <div className="flex flex-col lg:flex-row">
      <section className="w-full h-screen lg:w-1/2">
        <div className="header">
          <h1 className="title">
            WHALE <span className="md:tracking-wider">DATA</span> <span className="md:tracking-tighter">VIEWER</span>
          </h1>
          <div className="hidden md:flex flex-none h-28 bg-blue-800 w-1 mt-4 self-center"></div>
          <div className="md:hidden flex-none h-1 bg-blue-800 w-36 ml-4 self-center"></div>
          <h2 className="flex-shrink text-lg text-white md:pt-5 md:text-left md:pr-10">
            View charts and maps of whale sightings from the lighthouse on the Farallon Islands, near San Francisco, CA.
          </h2>
        </div>
        <div className="bg-slate-100 min-h-mobileBody md:min-h-body">
          <div className="px-10">
              <h3 className="text-md text-light-gray pt-5 pb-3 text-center">Please select a species and a year.</h3>
              <div className="flex flex-row gap-7 pb-10 text-light-gray">
                <Selector name={"Species"} list={speciesList} setStateMethod={setSelectedSpecies}></Selector>
                <Selector name={"Years"} list={yearsList} setStateMethod={setSelectedYear}></Selector>
              </div>
              <div className={selectedSpecies && selectedYear ? mobileMapVisible && isWindowNarrow(windowWidth) ? "hidden" : "flex h-60 md:h-96" : "hidden"}>
                <Chart 
                  selectedSpecies={selectedSpecies} 
                  selectedYear={selectedYear} 
                  sightingData={whaleData} 
                  setMonthMethod={setSelectedMonth}></Chart>
              </div>
            </div>
            <div className={mobileMapVisible && isWindowNarrow(windowWidth) ? "block" : "hidden"}>
              <Map mapType={"mobile"} sightingData={whaleData} selectedMonth={selectedMonth} mapVisible={mobileMapVisible}></Map>
            </div>
            <div className={selectedSpecies && selectedYear && isWindowNarrow(windowWidth) ? `flex m-5 ${mobileMapVisible ? "justify-start" : "justify-end"}` : "hidden"}>
              <MobileMapToggle mapVisible={mobileMapVisible} setMapVisibleMethod={setMobileMapVisible} setSelectedMonthMethod={setSelectedMonth}></MobileMapToggle>
            </div>
        </div>
      </section>
      <section className="hidden lg:block lg:w-1/2">
          <Map mapType={"desktop"} sightingData={whaleData} selectedMonth={selectedMonth} mapVisible={!isWindowNarrow(windowWidth)}></Map>
      </section>
    </div>
  );
}

export default App;
