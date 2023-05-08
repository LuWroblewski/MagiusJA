import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { faArrowDown, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import * as dotenv from 'dotenv';
dotenv.config();

interface Question {
  uuid: number;
  id: number;
  pergunta: string;
  key: number;
}

export const Form = () => {
  const [dataProfissional, setDataProfissional] = useState([]);
  const [shouldFetchData] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [formQuestion, setFormQuestion] = useState('profissional');

  const [displayGestaoLideranca, setDisplayGestaoLideranca] = useState(false);
  const [displayClimaOrganizacional, setDisplayClimaOrganizacional] = useState(true);
  const [displayBeneficios, setDisplayBeneficios] = useState(true);
  const [displayOportunidadeDesenvolvimento, setDisplayOportunidadeDesenvolvimento] = useState(true);
  const [displayMotivacao, setDisplayMotivacao] = useState(true);
  const [displayAmbienteCondicoes, setDisplayAmbienteCondicoes] = useState(true);
  const [displayIdentidadeConfianca, setDisplayIdentidadeConfianca] = useState(true);
  const [displayComunicacao, setDisplayComunicacao] = useState(true);
  const [displayCooperacao, setDisplayCooperacao] = useState(true);

  const menuChangeQuestion = (formQuestion: string) => {
    if (formQuestion == 'gestaoLideranca') {
      setDisplayClimaOrganizacional(false);
      setDisplayGestaoLideranca(true);
    }
    if (formQuestion == 'climaOrganizacional') {
      setDisplayClimaOrganizacional(true);
      setDisplayBeneficios(false);
    }
    if (formQuestion == 'beneficios') {
      setDisplayBeneficios(true);
      setDisplayOportunidadeDesenvolvimento(false);
    }
    if (formQuestion == 'oportunidadeDesenvolvimento') {
      setDisplayOportunidadeDesenvolvimento(true);
      setDisplayMotivacao(false);
    }
    if (formQuestion == 'motivacao') {
      setDisplayMotivacao(true);
      setDisplayAmbienteCondicoes(false);
    }
    if (formQuestion == 'ambienteCondicoes') {
      setDisplayAmbienteCondicoes(true);
      setDisplayIdentidadeConfianca(false);
    }
    if (formQuestion == 'identidadeConfianca') {
      setDisplayIdentidadeConfianca(true);
      setDisplayComunicacao(false);
    }
    if (formQuestion == 'comunicacao') {
      setDisplayComunicacao(true);
      setDisplayCooperacao(false);
    }
    if (formQuestion == 'cooperacao') {
      setDisplayCooperacao(true);
    }
    setFormQuestion(formQuestion);
  };

  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch(`/api/forms/${formQuestion}`);
      const dataProfissional = await response.json();
      setDataProfissional(dataProfissional.map((item: Question) => ({ ...item, id: item.id })));
      console.log(dataProfissional);
    }

    if (shouldFetchData) {
      fetchQuestion();
    }
  }, [formQuestion, shouldFetchData]);

  const answerResponse = (questionId: number, answer: string) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  useEffect(() => {
    console.log(selectedAnswer);
  }, [selectedAnswer]);

  return (
    <section className={style.menu}>
      <h1 className={style.titleQuestion}>Bem vindo ao formulario de Clima organizacional da Magius.</h1>

      <h2 className={style.stepQuestion}>
        O questionario é dividido entre 10 categorias, quando terminar de responder uma categoria apenas avance para a
        proxima clicando abaixo: <FontAwesomeIcon icon={faArrowDown} />
      </h2>
      <p className={style.alertQuestion}>
        <FontAwesomeIcon icon={faTriangleExclamation} size='xl' /> Lembrando, após avançar em uma etapa você não poderá
        voltar a etapa anterior
      </p>
      <ul className={style.ulMenu}>
        <li className={style.menuTheme}>
          <button disabled={true}>Profissional</button>
        </li>
        <li className={style.menuTheme}>
          <button disabled={displayGestaoLideranca} onClick={() => menuChangeQuestion('gestaoLideranca')}>
            Gestão/liderança
          </button>
        </li>
        <li className={style.menuTheme}>
          <button disabled={displayClimaOrganizacional} onClick={() => menuChangeQuestion('climaOrganizacional')}>
            Clima Organizacional
          </button>
        </li>
        <li className={style.menuTheme}>
          <button disabled={displayBeneficios} onClick={() => menuChangeQuestion('beneficios')}>
            Beneficios
          </button>
        </li>
        <li className={style.menuTheme}>
          <button
            disabled={displayOportunidadeDesenvolvimento}
            onClick={() => menuChangeQuestion('oportunidadeDesenvolvimento')}
          >
            Oportunidades e Desenvolvimento
          </button>
        </li>
        <li className={style.menuTheme}>
          <button disabled={displayMotivacao} onClick={() => menuChangeQuestion('motivacao')}>
            Motivação
          </button>
        </li>
        <li className={style.menuTheme}>
          <button disabled={displayAmbienteCondicoes} onClick={() => menuChangeQuestion('ambienteCondicoes')}>
            Ambiente/condições de trabalho
          </button>
        </li>
        <li className={style.menuTheme}>
          <button disabled={displayIdentidadeConfianca} onClick={() => menuChangeQuestion('identidadeConfianca')}>
            identidade e confiança
          </button>
        </li>
        <li className={style.menuTheme}>
          <button disabled={displayComunicacao} onClick={() => menuChangeQuestion('comunicacao')}>
            comunicação
          </button>
        </li>
        <li className={style.menuTheme}>
          <button disabled={displayCooperacao} onClick={() => menuChangeQuestion('cooperacao')}>
            cooperação
          </button>
        </li>
      </ul>
      <ul className={style.tableQuestion}>
        <h2 className={style.stepQuestion}>Perguntas sobre a categoria profissional</h2>

        {dataProfissional.map((item: Question) => (
          <li key={item.id}>
            <li className={style.liQuestion}>{item.pergunta}</li>
            <li onClick={() => answerResponse(item.uuid, 'a')} className={style.liOption}>
              <input
                className={style.radioQuestion}
                name={`${item.uuid} item `}
                type='radio'
                id={`${item.uuid} radioOptionRuim`}
              />
              <label className={style.labelQuestion} htmlFor={`${item.id} radioOptionRuim`}>
                a) ruim
              </label>
            </li>
            <li onClick={() => answerResponse(item.uuid, 'b')} className={style.liOption}>
              <input
                className={style.radioQuestion}
                name={`${item.uuid} item `}
                type='radio'
                id={`${item.uuid} radioOptionRegular`}
              />
              <label className={style.labelQuestion} htmlFor={`${item.id} radioOptionRegular`}>
                b) regular
              </label>
            </li>
            <li onClick={() => answerResponse(item.uuid, 'c')} className={style.liOption}>
              <input
                className={style.radioQuestion}
                name={`${item.uuid} item `}
                type='radio'
                id={`${item.uuid} radioOptionBom`}
              />
              <label className={style.labelQuestion} htmlFor={`${item.id} radioOptionBom`}>
                c) bom
              </label>
            </li>
            <li onClick={() => answerResponse(item.uuid, 'd')} className={style.liOption}>
              <input
                className={style.radioQuestion}
                name={`${item.uuid} item `}
                type='radio'
                id={`${item.uuid} radioOptionExcelente`}
              />
              <label className={style.labelQuestion} htmlFor={`${item.id} radioOptionExcelente`}>
                d) excelente
              </label>
            </li>
          </li>
        ))}
      </ul>
    </section>
  );
};
