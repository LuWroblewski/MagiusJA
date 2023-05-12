import { Menu } from '../components/Menu';
import { Indicators } from '../components/indicators';

const Home = () => {
  const chartData1 = [20, 30, 40, 50];

  return (
    <div className='Home'>
      <Menu />
      <div className='chartStyle'>
        <Indicators categoriaChart={'profissional'} dataChart={chartData1} titleChart='Profissional' />
        <Indicators categoriaChart={'gestao/lideranca'} dataChart={chartData1} titleChart='Gestão / Liderança' />
      </div>

      <div className='chartStyle'>
        <Indicators categoriaChart={'climaOrganizacional'} dataChart={chartData1} titleChart='Clima Organizacional' />
        <Indicators categoriaChart={'beneficios'} dataChart={chartData1} titleChart='Beneficios' />
      </div>

      <div className='chartStyle'>
        <Indicators
          categoriaChart={'oportunidade/desenvolvimento'}
          dataChart={chartData1}
          titleChart='Oportunidade / Desenvolvimento'
        />
        <Indicators categoriaChart={'motivacao'} dataChart={chartData1} titleChart='Motivação' />
      </div>

      <div className='chartStyle'>
        <Indicators
          categoriaChart={'ambiente/condicoesDeTrabalho'}
          dataChart={chartData1}
          titleChart='Ambiente / Condições de trabalho'
        />
        <Indicators
          categoriaChart={'identidade/confianca'}
          dataChart={chartData1}
          titleChart='Identidade e confiança'
        />
      </div>

      <div className='chartStyle'>
        <Indicators categoriaChart={'comunicacao'} dataChart={chartData1} titleChart='Comunicação' />
        <Indicators categoriaChart={'cooperacao'} dataChart={chartData1} titleChart='Cooperação' />
      </div>
    </div>
  );
};

export default Home;
