import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import * as dotenv from 'dotenv';
dotenv.config();

const vercelToken = process.env.VERCEL_TOKEN;

export const MenuQuestion = () => {
  const [question, setQuestion] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');

  const handleclick = () => {
    if (selectedOption == '') {
      alert('Retorne a etapa 1 e selecione uma das opções');
      return;
    } else if (question == '') {
      alert('Retorne a etapa 2 e selecione uma das opções');
      return;
    } else if (selectedTheme == '') {
      alert('Retorne a etapa 3 e selecione uma das opções');
      return;
    }

    if (selectedOption == 'multipleChoice') {
      fetch('./api/multipleChoiceQuestion', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + vercelToken,
        },
        body: JSON.stringify({
          question: question,
          theme: selectedTheme,
        }),
      });
      setQuestion('');
      setSelectedOption('');
      setSelectedTheme('');
    } else if (selectedOption == 'subjective') {
      fetch('./api/subjectiveQuestion', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + vercelToken,
        },
        body: JSON.stringify({
          question: question,
          theme: selectedTheme,
        }),
      });
      setQuestion('');
      setSelectedOption('');
      setSelectedTheme('');
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleclick();
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(event.target.value);
  };

  return (
    <section className={style.menu}>
      <form className={style.formQuestion} onSubmit={handleSubmit}>
        <h1 className={style.titleQuestion}>
          Cadastre uma pergunta ao questionário <FontAwesomeIcon icon={faPenToSquare} />
        </h1>
        <h2 className={style.StepQuestion}> 1º Escolha como será a pergunta</h2>
        <select className={style.selectQuestion} value={selectedOption} onChange={handleOptionChange}>
          <option hidden value=''>
            Selecione uma opção
          </option>
          <option value='multipleChoice'>Questão múltipla escolha</option>
          <option value='subjective'>Questão subjetiva</option>
        </select>
        <h2 className={style.StepQuestion}> 2º Agora escolha a categoria da sua pergunta</h2>
        <select className={style.selectTheme} value={selectedTheme} onChange={handleThemeChange}>
          <option hidden value=''>
            Selecione uma opção
          </option>
          <option value='profissional'>Profissional</option>
          <option value='gestao/lideranca'>Gestão/liderança</option>
          <option value='climaOrganizacional'>Clima organizacional</option>
          <option value='beneficios'>Benefícios</option>
          <option value='oportunidade/desenvolvimento'>Oportunidade/desenvolvimento</option>
          <option value='motivacao'>Motivação</option>
          <option value='ambiente/condicoesDeTrabalho'>Ambiente/condições de trabalho</option>
          <option value='identidade/confianca'>Identidade/confiança</option>
          <option value='comunicacao'>Comunicação</option>
          <option value='cooperacao'>Cooperação</option>
        </select>
        <h2 className={style.StepQuestion}> Agora, escreva a pergunta</h2>
        <textarea
          className={style.fieldQuestion}
          placeholder='  Coloque a pergunta aqui...'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <br />
        <button className={style.buttonQuestion} type='submit' id='add-question'>
          Adicionar pergunta <FontAwesomeIcon icon={faSquareCheck} size='xl' />
        </button>
      </form>
    </section>
  );
};
