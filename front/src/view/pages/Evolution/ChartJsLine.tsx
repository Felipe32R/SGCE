//@ts-nocheck
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(
  LineElement, CategoryScale, LinearScale, PointElement,
)

interface ChartJsLineProps{
  data: any;
}

export default function ChartJsLine({data}: ChartJsLineProps) {
  const chartData = {
    labels: data.map((evolution: any) => `${evolution.month}/${evolution.year}`),
    datasets: [{
      axis: 'y',
      label: 'My First Dataset',
      data: data.map((evolution: any) => evolution.nps),
      fill: true,
      tension: 0.4,
      backgroundColor: [
      '#007648'
      ],
      borderColor: [
        '#007648',
        
      ],
      borderWidth: 1
    }]
  };
  
  const options = {
    plugins: {
      legends: true
    },
    scales:{
      y:{
       

      },

    }
  }

  return (

    <Line data={chartData} options={options} />

  )
}
