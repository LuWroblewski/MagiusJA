//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.css';
import * as dotenv from 'dotenv';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Colors, Legend, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Colors, Legend, Tooltip);

dotenv.config();

interface ChartProps {
  dataChart: number[];
  titleChart: string;
  categoriaChart: string;
}

export const Indicators: React.FC<ChartProps> = ({ dataChart, titleChart, categoriaChart }) => {
  const chartData = {
    labels: ['Ruim', 'Regular', 'Bom', 'Excelente'],
    datasets: [
      {
        labels: ['Ruim', 'Regular', 'Bom', 'Excelente'],
        data: dataChart,
        backgroundColor: [
          'rgba(255, 0, 0, 0.6)',
          'rgba(0, 0, 255, 0.6)',
          'rgba(255, 134, 54,0.6)',
          'rgba(250, 102, 128,0.6)',
        ],
        borderColor: [
          'rgba(255, 0, 0, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(255, 134, 54,0.2)',
          'rgba(250, 102, 128,0.2)',
        ],
        borderWidth: 1,
        margin: 0,
      },
    ],
  };
  const chartOptions = {
    animation: {
      duration: 2000,
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
    },
    tooltip: {
      enabled: true,
    },
  };

  const handleChoiceCategoria = async (categoria: string) => {
    const response = await fetch('./api/indicator/indicatorResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ',
      },
      body: JSON.stringify({
        categoria: categoria,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  handleChoiceCategoria(categoriaChart);

  return (
    <section className={style.menu}>
      <div className={style.chartStyle}>
        <p>{titleChart}</p>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </section>
  );
};
