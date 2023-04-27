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
  const [selectedOption, setSelectedOption] = useState('');

  const handleclick = (pergunta: string) => {
    if (selectedOption == '') {
      alert('Retorne a etapa 1 e selecione uma das opções');
      return;
    }

    if (selectedOption == 'multipleChoice') {
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
        setSelectedOption('');
        setShouldFetchData(true);
      });
    } else if (selectedOption == 'subjective') {
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
        setSelectedOption('');
        setShouldFetchData(true);
      });
    }
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
      const response = await fetch('/api/findmSubjectiveQuestion');
      const dataMultipleChoice = await response.json();
      setDataSubjective(dataMultipleChoice.map((item: Question) => ({ ...item, id: item.id })));
    }

    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false);
    }
  }, [shouldFetchData]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <section className={style.menu}>
      <h1 className={style.titleQuestion}>
        Remova uma pergunta do questionario <FontAwesomeIcon icon={faXmark} size='2xl' />
      </h1>
      <h2 className={style.StepQuestion}> 1º Escolha qual pergunta será removida</h2>
      <select className={style.selectQuestion} value={selectedOption} onChange={handleOptionChange}>
        <option value=''> Selecione uma opção</option>
        <option value='multipleChoice'>Questão multipla escolha</option>
        <option value='subjective'>Questão subjetiva</option>
      </select>
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
              <button className={style.removeButton} onClick={() => handleclick(item.pergunta)}>
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
                onClick={() => handleclick(item.pergunta)}
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
