import {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useQuery } from 'react-query';
import { API } from '../../functions/API';
import Loader from '../../components/loader';
import { useParams } from 'react-router';
import { formatDate } from '../../functions/functions';
import { chartDataType, chartOptionsType } from '../../functions/types';

ChartJS.register(...registerables);


export default function Chart() {
    const [chartData, setChartData] = useState<chartDataType>()
    const [chartOptions, setChartOptions] = useState<chartOptionsType>()
    const { id } = useParams();

    const {
        status, 
        data
    } = useQuery({
        queryKey:['stats'],
        queryFn: () => API({
            url:`stats?id=${id}`,
            method:'GET',
            data: {},
            headers: {}
        }),
    
    })    

    useEffect(() => {
        if(!data) return

        let labels = data.data.map((item: any) => {
            return formatDate(new Date(item.CreatedAt)).dmy()
        })
        
        let chartData = data.data.map((item: any) => {
            return item.grade
        })

        setChartData({
            labels,
            datasets: [{
                    label: 'Grade',
                    data: chartData,
                    borderColor: ['rgb(110, 110, 110)'],
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
                        size: 24,
                    },
                    callbacks: {
                        label: function(e: any) {
                            let item = data.data[e.dataIndex];
                            
                            let msg = `${item.correctAnswer}/${item.wrongAnswer + item.correctAnswer}, Grade: ${Math.floor(item.grade)}%`;

                            return msg
                        }
                    },
                    titleFont: {
                        family: 'Poppins',
                        weight: '600',
                       
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

    }, [data])
    
    if(status === 'loading') return <Loader />
   return(
    <div className="chart-wrapper">

        <div className="chart">
            {(chartData && chartOptions) && 
            <Line data={chartData} options={chartOptions} />}
        </div>
    </div>
   )
}

