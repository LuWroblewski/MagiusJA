import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { faRetweet, faWrench } from '@fortawesome/free-solid-svg-icons';
import * as dotenv from 'dotenv';
dotenv.config();

const vercelToken = process.env.VERCEL_TOKEN;

interface Question {
  id: number;
  pergunta: string;
}

export const UpdateQuestion = () => {
  const [dataMultipleChoice, setDataMultipleChoice] = useState([]);
  const [dataSubjective, setDataSubjective] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const [question, setQuestion] = useState('');

  const validation = () => {
    if (question == '') {
      alert('Retorne a etapa 2 e selecione uma das opções');
      return;
    }
  };

  const handleMultipleButton = (pergunta: string) => {
    validation();

    console.log(pergunta);
    fetch('./api/updateQuestion', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + vercelToken,
      },
      body: JSON.stringify({
        table: 'perguntamultiplaescolha',
        newQuestion: question,
        question: pergunta,
      }),
    }).then(() => {
      setQuestion('');
      setShouldFetchData(true);
    });
  };

  const handleSubjectiveButton = (pergunta: string) => {
    validation();

    console.log(pergunta);
    fetch('./api/updateQuestion', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + vercelToken,
      },
      body: JSON.stringify({
        table: 'respostasubjetiva',
        newQuestion: question,
        question: pergunta,
      }),
    }).then(() => {
      setQuestion('');
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
        Atualize uma pergunta do questionário <FontAwesomeIcon icon={faWrench} size='2xl' />
      </h1>
      <h2 className={style.StepQuestion}>
        1º Escreva a pergunta que <b>irá</b> substituir
      </h2>
      <textarea
        className={style.fieldQuestion}
        placeholder='  Coloque a pergunta aqui...'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>
      <h2 className={style.StepQuestion}>
        Agora selecione a pergunta que <b>será</b> substituida
      </h2>
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
              <button className={style.updateButton} onClick={() => handleMultipleButton(item.pergunta)}>
                <FontAwesomeIcon icon={faRetweet} size='2xl' />
              </button>
            </tr>
          ))}
          {dataSubjective.map((item: Question) => (
            <tr key={item.id}>
              <td className={style.tdQuestion}>{item.pergunta}</td>
              <button
                style={{ color: '#007bff' }}
                className={style.updateButton}
                onClick={() => handleSubjectiveButton(item.pergunta)}
              >
                <FontAwesomeIcon icon={faRetweet} size='2xl' />
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
