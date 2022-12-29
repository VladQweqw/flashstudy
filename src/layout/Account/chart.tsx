import React,{useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);




interface chartDataType {
    labels: string[],
    datasets: {label: string, data: number[], backgroundColor: string[]}[],
}

interface chartOptionsType {
    maintainAspectRatio : boolean,
    plugins: any
}

const data = {
    marks: [65, 98, 23],

}

const dates = new Array(3).fill(new Date().toDateString())

export default function Chart() {
    const [chartData, setChartData] = useState<chartDataType>()
    const [chartOptions, setChartOptions] = useState<chartOptionsType>()
    
    useEffect(() => {
      
        setChartData({
            labels: dates.map((mark) => mark),
            datasets: [
                {
                    label: '% Of correct answers',
                    data: data.marks.map((mark) => mark),
                    backgroundColor: [
                        '#D09683',
                    ]
                }
            ]
        }) 

        setChartOptions({
            maintainAspectRatio : false,
            
            plugins: {
                layout: {
                    padding:10
                },
                legend: {
                    labels: {
                        font: {
                            size: 16,
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Quiz progress',
                    font: {
                        size: 18,
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                tooltip: {
                    font: {
                        size: 18,
                       
                    },
                    titleFont: {
                        family: 'Poppins',
                        weight: '500'
                    },
                    padding: {
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10,
                    },
                    backgroundColor: '#1C1C1C',
                }
            }
        })   

    }, [])
    

   return(
    <div className="chart-wrapper">

        <div className="chart">
            {(chartData && chartOptions) && 
            <Bar data={chartData} options={chartOptions} />}
        </div>
    </div>
   )
}

