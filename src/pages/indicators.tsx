import { Menu } from '../components/Menu';
import { Indicators } from '../components/indicators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const Home = () => {
  const charts = useRef(null);

  const gerarPDF = () => {
    if (charts.current) {
      html2canvas(charts.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        pdf.save('relatorio_indicadores.pdf');
      });
    }
  };

  return (
    <div className='Home'>
      <Menu />
      <div className='menuConfig'>
        <div className='listConfig'>
          <button className='buttonConfig' onClick={gerarPDF}>
            Gerar PDF
          </button>
        </div>
      </div>

      <h1 className='titleIndicators'>Bem-vindo aos indicadores Magius.</h1>
      <h2 className='textIndicators'> Cada indicador se refere a uma categoria</h2>
      <ul className='captions'>
        <p className='textIndicators'>Legenda de cada cor</p>
        <li className='captionRuim' style={{ backgroundColor: 'rgba(255, 0, 0, 0.6)' }}>
          Ruim
        </li>
        <li className='captionRegular' style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
          Regular
        </li>
        <li className='captionBom' style={{ backgroundColor: 'rgba(255, 134, 54, 0.6)' }}>
          Bom
        </li>
        <li className='captionExcelente' style={{ backgroundColor: 'rgba(250, 102, 128, 0.6)' }}>
          Excelente
        </li>
      </ul>
      <div ref={charts}>
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
    </div>
  );
};

export default Home;
