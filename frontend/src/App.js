import React, {useEffect, useState} from "react";
import Selector from "./components/Selector";

function App() {
  const [speciesList, setSpeciesList] = useState(null);
  const [yearsList, setYearsList] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [whaleData, setWhaleData] = useState(null);

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

  return (
    <div>
      <header className="App-header"></header>
      <body>
        <div className="flex flex-row">
          <section className="w-1/2 min-h-screen">
            <div className="flex flex-row bg-cyan-500 min-h-header px-5 items-center">
              <h1 className="flex-none text-5xl text-white w-1/4 text-right font-medium tracking-tight">WHALE <span className="tracking-wider">DATA</span> <span className="tracking-tighter">VIEWER</span></h1>
              <div className="flex-none h-28 bg-blue-800 w-1 mt-4 mx-5 self-center"></div>
              <h2 className="flex-shrink text-lg text-white pt-5">View charts and maps of whale sightings from the lighthouse on the Farallon Islands, near San Francisco, CA.</h2>
            </div>
            <div className="bg-slate-100 min-h-body">
              <div className="px-10">
                <h3 className="text-md text-blue-900 pt-5 pb-3">Please select a species and a year.</h3>
                <div className="flex flex-row gap-7">
                  <Selector name={"Species"} list={speciesList} setStateMethod={setSelectedSpecies}></Selector>
                  <Selector name={"Years"} list={yearsList} setStateMethod={setSelectedYear}></Selector>
                </div>
              </div>
            </div>
          </section>
          <section></section>
        </div>
      </body>
    </div>
  );
}

export default App;
