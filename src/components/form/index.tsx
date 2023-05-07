import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import * as dotenv from 'dotenv';
dotenv.config();

interface Question {
  id: number;
  pergunta: string;
}

export const Form = () => {
  const [dataProfissional, setDataProfissional] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    async function fetchProfissional() {
      const response = await fetch('/api/forms/profissional');
      const dataProfissional = await response.json();
      setDataProfissional(dataProfissional.map((item: Question) => ({ ...item, id: item.id })));
      console.log(dataProfissional);
    }

    if (shouldFetchData) {
      fetchProfissional();
      setShouldFetchData(false);
    }
  }, [shouldFetchData]);

  const answerResponse = (answer: string) => {
    setSelectedAnswer(answer);
  };

  useEffect(() => {
    console.log(selectedAnswer);
  }, [selectedAnswer]);

  return (
    <section className={style.menu}>
      <h1 className={style.titleQuestion}>Bem vindo ao formulario de Clima organizacional da Magius.</h1>
      <h2 className={style.StepQuestion}>
        O questionario é dividido entre 10 categorias, quando terminar de responder uma categoria apenas avance para a
        proxima clicando abaixo: <FontAwesomeIcon icon={faArrowDown} />
      </h2>
      <ul className={style.ulMenu}>
        <li className={style.liProfissional}>Profissional</li>
        <li>Gestão/liderança</li>
        <li>Clima Organizacional</li>
        <li>Beneficios</li>
        <li>Oportunidades e Desenvolvimento</li>
        <li>Motivação</li>
        <li>Ambiente/condições de trabalho</li>
        <li>identidade e confiança</li>
        <li>comunicação</li>
        <li>cooperação</li>
      </ul>
      <ul className={style.tableQuestion}>
        <h2 className={style.StepQuestion}>Perguntas sobre a categoria profissional</h2>

        {dataProfissional.map((item: Question) => (
          <li key={item.id}>
            <li className={style.liQuestion}>{item.pergunta}</li>
            <li onClick={() => answerResponse('a')} className={style.liOption}>
              <input className={style.radioQuestion} name='item' type='radio' id='radioOptionRuim' />
              <label htmlFor='radioOptionRuim'>a) ruim</label>
            </li>
            <li onClick={() => answerResponse('b')} className={style.liOption}>
              <input className={style.radioQuestion} name='item' type='radio' id='radioOptionRegular' />
              <label htmlFor='radioOptionRegular'> b) regular</label>
            </li>
            <li onClick={() => answerResponse('c')} className={style.liOption}>
              <input className={style.radioQuestion} name='item' type='radio' id='radioOptionBom' />
              <label htmlFor='radioOptionBom'> c) bom</label>
            </li>
            <li onClick={() => answerResponse('d')} className={style.liOption}>
              <input className={style.radioQuestion} name='item' type='radio' id='radioOptionExcelente' />
              <label htmlFor='radioOptionExcelente'> d) excelente</label>
            </li>
          </li>
        ))}
      </ul>
    </section>
  );
};
