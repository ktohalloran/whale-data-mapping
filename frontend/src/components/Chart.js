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
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Chart = ({selectedSpecies, selectedYear, sightingData}) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: selectedSpecies && selectedYear ? `${selectedSpecies} sighted in ${selectedYear}` : ""
            }
        }
    }

    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    const data = {
        labels,
        datasets: [{
            data: []
        }]
    }
    
    return (
        <div className="w-full h-full">
            <Line options={options} data={data}></Line>
        </div>
    )
}

export default Chart;