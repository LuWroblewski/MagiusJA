import { Menu } from '../components/Menu';
import { Indicators } from '../components/indicators';

const Home = () => {
  return (
    <div className='Home'>
      <Menu />
      <div className='chartStyle'>
        <Indicators categoriaChart={'profissional'} titleChart='Profissional' />
        <Indicators categoriaChart={'gestao/lideranca'} titleChart='Gestão / Liderança' />
      </div>

      <div className='chartStyle'>
        <Indicators categoriaChart={'climaOrganizacional'} titleChart='Clima Organizacional' />
        <Indicators categoriaChart={'beneficios'} titleChart='Beneficios' />
      </div>

      <div className='chartStyle'>
        <Indicators categoriaChart={'oportunidade/desenvolvimento'} titleChart='Oportunidade / Desenvolvimento' />
        <Indicators categoriaChart={'motivacao'} titleChart='Motivação' />
      </div>

      <div className='chartStyle'>
        <Indicators categoriaChart={'ambiente/condicoesDeTrabalho'} titleChart='Ambiente / Condições de trabalho' />
        <Indicators categoriaChart={'identidade/confianca'} titleChart='Identidade e confiança' />
      </div>

      <div className='chartStyle'>
        <Indicators categoriaChart={'comunicacao'} titleChart='Comunicação' />
        <Indicators categoriaChart={'cooperacao'} titleChart='Cooperação' />
      </div>
    </div>
  );
};

export default Home;
