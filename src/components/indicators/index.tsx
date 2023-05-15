//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.css';
import * as dotenv from 'dotenv';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Colors, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
ChartJS.register(CategoryScale, LinearScale, BarElement, Colors, Legend, Tooltip);

dotenv.config();

interface ChartProps {
  titleChart: string;
  categoriaChart: string;
}

interface Post {
  ruim: number;
  regular: number;
  bom: number;
  excelente: number;
}

export const Indicators: React.FC<ChartProps> = ({ titleChart, categoriaChart }) => {
  const [dataChart, setDataChart] = useState<Array<number>>([]);

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

  useEffect(() => {
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

      let ruim = 0;
      let regular = 0;
      let bom = 0;
      let excelente = 0;

      data.map((post: Post) => {
        ruim = post.ruim;
        regular = post.regular;
        bom = post.bom;
        excelente = post.excelente;

        const newData = [ruim, regular, bom, excelente];
        setDataChart(newData);
        console.log(newData);
      });
    };

    handleChoiceCategoria(categoriaChart);
  }, [categoriaChart]);

  return (
    <section className={style.menu}>
      <div className={style.chartStyle}>
        <p>{titleChart}</p>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </section>
  );
};
