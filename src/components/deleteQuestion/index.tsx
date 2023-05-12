import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { faDeleteLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import * as dotenv from 'dotenv';
dotenv.config();

const vercelToken = process.env.VERCEL_TOKEN;

interface Question {
  id: number;
  pergunta: string;
}

export const DeleteQuestion = () => {
  const [dataMultipleChoice, setDataMultipleChoice] = useState([]);
  const [dataSubjective, setDataSubjective] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(true);

  const handleMultipleButton = (pergunta: string) => {
    console.log(pergunta);
    fetch('./api/deleteQuestion', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + vercelToken,
      },
      body: JSON.stringify({
        table: 'perguntamultiplaescolha',
        question: pergunta,
      }),
    }).then(() => {
      setShouldFetchData(true);
    });
  };

  const handleSubjectiveButton = (pergunta: string) => {
    console.log(pergunta);
    fetch('./api/deleteQuestion', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + vercelToken,
      },
      body: JSON.stringify({
        table: 'respostasubjetiva',
        question: pergunta,
      }),
    }).then(() => {
      setShouldFetchData(true);
    });
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/findmultipleChoiceQuestion');
      const dataMultipleChoice = await response.json();
      setDataMultipleChoice(dataMultipleChoice.map((item: Question) => ({ ...item, id: item.id })));
    }

    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false);
    }
  }, [shouldFetchData]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/findSubjectiveQuestion');
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
      <h1 className={style.titleQuestion}>
        Remova uma pergunta do questionario <FontAwesomeIcon icon={faXmark} size='2xl' />
      </h1>
      <table className={style.tableQuestion}>
        <thead>
          <tr>
            <th>Perguntas: </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataMultipleChoice.map((item: Question) => (
            <tr key={item.id}>
              <td className={style.tdQuestion}>{item.pergunta}</td>
              <button className={style.removeButton} onClick={() => handleMultipleButton(item.pergunta)}>
                <FontAwesomeIcon icon={faDeleteLeft} size='2xl' />
              </button>
            </tr>
          ))}
          {dataSubjective.map((item: Question) => (
            <tr key={item.id}>
              <td className={style.tdQuestion}>{item.pergunta}</td>
              <button
                style={{ color: '#007bff' }}
                className={style.removeButton}
                onClick={() => handleSubjectiveButton(item.pergunta)}
              >
                <FontAwesomeIcon icon={faDeleteLeft} size='2xl' />
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
