import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );



const Chart = ({selectedSpecies, selectedYear, sightingData, setMonthMethod}) => {
    const speciesLabel = selectedSpecies === "Unknown" ? `${selectedSpecies} Whales` : `${selectedSpecies}s`

    const fontFamily = "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                labels: {
                    font: {
                        family: fontFamily
                    }
                }
            },
            title: {
                display: true,
                text: `Number of ${speciesLabel} sighted in ${selectedYear}`,
                font: {
                    family: fontFamily,
                    size: 16,
                    weight: 400,
                }
            },
            tooltip: {
                displayColors: false,
                backgroundColor: "white",
                titleColor: "black",
                titleAlign: "center",
                bodyColor: "black",
                bodyAlign: "center",
                cornerRadius: 3
            }
        },
        scales: {
            y: {
                min: 0,
                ticks: {
                    stepSize: 2
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        onHover: (e, elements) => {
            return elements.length > 0 ? setMonthMethod(elements[0]["index"]) : setMonthMethod(null)
        }
    }

    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    const data = {
        labels,
        datasets: [{
            data: sightingData ? sightingData.map(monthSighting => monthSighting["sightingCount"]) : [],
            pointHoverBackgroundColor: "rgb(30 64 175)",
            pointHoverBorderColor: "rgb(30 64 175)",
            pointHoverRadius: 5,
            borderColor: "rgb(6 182 212)",
            pointBackgroundColor: "rgb(6 182 212)",
            borderWidth: 1,
            fill: true,
            backgroundColor: "rgba(6, 182, 212, .1)",
            tension: .4
        }]
    }
    
    return (
        <Line options={options} data={data}></Line>
    )
}

export default Chart;