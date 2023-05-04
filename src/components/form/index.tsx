import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { faArrowDown, faRetweet } from '@fortawesome/free-solid-svg-icons';
import * as dotenv from 'dotenv';
dotenv.config();

interface Question {
  id: number;
  pergunta: string;
}

export const Form = () => {
  const [dataProfissional, setDataProfissional] = useState([]);
  const [dataSubjective, setDataSubjective] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(true);

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

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/findmSubjectiveQuestion');
      const dataMultipleChoice = await response.json();
      setDataSubjective(dataMultipleChoice.map((item: Question) => ({ ...item, id: item.id })));
    }

    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false);
    }
  }, [shouldFetchData]);

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
            <li className={style.tdQuestion}>{item.pergunta}</li>
            <li>a) ruim </li>
            <li>b) regular </li>
            <li>c) bom </li>
            <li>d) excelente </li>
          </li>
        ))}
        {dataSubjective.map((item: Question) => (
          <li key={item.id}>
            <span className={style.tdQuestion}>{item.pergunta}</span>
            <FontAwesomeIcon icon={faRetweet} size='2xl' />
          </li>
        ))}
      </ul>
    </section>
  );
};
