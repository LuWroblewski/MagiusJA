import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { faArrowDown, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/magius.png';
import Image from 'next/image';
import * as dotenv from 'dotenv';
import { printerComprovante } from './printerComprovante';
dotenv.config();

interface Question {
  uuid: number;
  id: number;
  pergunta: string;
  key: number;
}

export const Form = () => {
  const [dataAnswer, setdataAnswer] = useState([]);
  const [shouldFetchData] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: string }>({});
  const [formQuestion, setFormQuestion] = useState('profissional');
  const [stepQuestion, setStepQuestion] = useState('Profissional');
  const [displayMenu, setDisplayMenu] = useState('');
  const [displaySubmit, setDisplaySubmit] = useState('none');
  const [displayThankyou, setDisplayThankyou] = useState('');
  const [displayFinal, setDisplayFinal] = useState('');

  const [displayProfissional, setDisplayProfissional] = useState(false);
  const [displayGestaoLideranca, setDisplayGestaoLideranca] = useState(false);
  const [displayClimaOrganizacional, setDisplayClimaOrganizacional] = useState(true);
  const [displayBeneficios, setDisplayBeneficios] = useState(true);
  const [displayOportunidadeDesenvolvimento, setDisplayOportunidadeDesenvolvimento] = useState(true);
  const [displayMotivacao, setDisplayMotivacao] = useState(true);
  const [displayAmbienteCondicoes, setDisplayAmbienteCondicoes] = useState(true);
  const [displayIdentidadeConfianca, setDisplayIdentidadeConfianca] = useState(true);
  const [displayComunicacao, setDisplayComunicacao] = useState(true);
  const [displayCooperacao, setDisplayCooperacao] = useState(true);

  const fetchAnswer = async () => {
    await fetch('./api/answerForm/answerQuestion', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        selectedAnswer: selectedAnswer,
      }),
    });
  };

  const menuChangeQuestion = async (formQuestion: string) => {
    if (formQuestion == 'gestaoLideranca') {
      await fetchAnswer();
      setDisplayProfissional(true);
      setStepQuestion('Gestão / liderança');
      setDisplayClimaOrganizacional(false);
      setDisplayGestaoLideranca(true);
      setSelectedAnswer({});
    }
    if (formQuestion == 'climaOrganizacional') {
      await fetchAnswer();
      setDisplayClimaOrganizacional(true);
      setStepQuestion('Clima Organizacional');
      setDisplayBeneficios(false);
      setSelectedAnswer({});
    }
    if (formQuestion == 'beneficios') {
      await fetchAnswer();
      setDisplayBeneficios(true);
      setStepQuestion('Beneficios');
      setDisplayOportunidadeDesenvolvimento(false);
      setSelectedAnswer({});
    }
    if (formQuestion == 'oportunidadeDesenvolvimento') {
      await fetchAnswer();
      setDisplayOportunidadeDesenvolvimento(true);
      setStepQuestion('Opotunidade / Desenvolvimento');
      setDisplayMotivacao(false);
      setSelectedAnswer({});
    }
    if (formQuestion == 'motivacao') {
      await fetchAnswer();
      setDisplayMotivacao(true);
      setStepQuestion('Motivação');
      setDisplayAmbienteCondicoes(false);
      setSelectedAnswer({});
    }
    if (formQuestion == 'ambienteCondicoes') {
      await fetchAnswer();
      setDisplayAmbienteCondicoes(true);
      setStepQuestion('Ambiente/Condições de trabalho');
      setDisplayIdentidadeConfianca(false);
      setSelectedAnswer({});
    }
    if (formQuestion == 'identidadeConfianca') {
      await fetchAnswer();
      setDisplayIdentidadeConfianca(true);
      setStepQuestion('Identidade e confiança');
      setDisplayComunicacao(false);
      setSelectedAnswer({});
    }
    if (formQuestion == 'comunicacao') {
      await fetchAnswer();
      setDisplayComunicacao(true);
      setStepQuestion('Comunicação');
      setDisplayCooperacao(false);
      setSelectedAnswer({});
    }
    if (formQuestion == 'cooperacao') {
      await fetchAnswer();
      setDisplayCooperacao(true);
      setStepQuestion('Cooperação');
      setSelectedAnswer({});
      setDisplayMenu('none');
      setDisplaySubmit('');
    }
    setFormQuestion(formQuestion);
  };

  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch(`/api/forms/${formQuestion}`);
      const dataAnswer = await response.json();
      setdataAnswer(dataAnswer.map((item: Question) => ({ ...item, id: item.id })));
      console.log(dataAnswer);
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

  const finalizarQuestionario = async () => {
    fetchAnswer();
    setDisplayFinal('none');
    setDisplayThankyou('block');
    setTimeout(async () => {
      window.location.reload();
    }, 3000);
  };
  printerComprovante();

  return (
    <>
      <div className={style.menuImage}>
        <Image className={style.img} src={logo} alt='imageMenu' />
      </div>

      <section className={style.menu}>
        <div style={{ display: displayFinal }}>
          <h1 className={style.titleQuestion}>Bem-vindo ao formulário de Clima Organizacional da Magius.</h1>

          <h2 className={style.stepQuestion}>
            O questionário é dividido entre 10 categorias, quando terminar de responder uma categoria apenas avance para
            a próxima clicando abaixo: <FontAwesomeIcon icon={faArrowDown} />
          </h2>
          <p className={style.alertQuestion}>
            <FontAwesomeIcon icon={faTriangleExclamation} size='xl' /> Lembrando, após avançar em uma etapa você não
            poderá voltar a etapa anterior
          </p>
          <button
            className={style.submitForm}
            style={{ display: displaySubmit }}
            type='submit'
            onClick={finalizarQuestionario}
          >
            <p>Finalizar formulario.</p> (lembre de verificar se respondeu a essa ultima categoria)
          </button>
          <ul className={style.ulMenu} style={{ display: displayMenu }}>
            <li className={style.menuTheme}>
              <button disabled={displayProfissional} style={{ borderRadius: '8px 0 0 0' }}>
                Profissional
              </button>
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
                Benefícios
              </button>
            </li>
            <li className={style.menuTheme}>
              <button
                disabled={displayOportunidadeDesenvolvimento}
                onClick={() => menuChangeQuestion('oportunidadeDesenvolvimento')}
                style={{ borderRadius: '0 8px 0 0' }}
              >
                Oportunidades e Desenvolvimento
              </button>
            </li>
            <li className={style.menuTheme}>
              <button
                disabled={displayMotivacao}
                onClick={() => menuChangeQuestion('motivacao')}
                style={{ borderRadius: '0 0 0 8px' }}
              >
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
                Identidade e confiança
              </button>
            </li>
            <li className={style.menuTheme}>
              <button disabled={displayComunicacao} onClick={() => menuChangeQuestion('comunicacao')}>
                Comunicação
              </button>
            </li>
            <li className={style.menuTheme}>
              <button
                disabled={displayCooperacao}
                onClick={() => menuChangeQuestion('cooperacao')}
                style={{ borderRadius: '0 0 8px 0' }}
              >
                Cooperação
              </button>
            </li>
          </ul>
          <ul className={style.tableQuestion}>
            <h2 className={style.stepQuestion}>Você está na etapa {stepQuestion}</h2>

            {dataAnswer.map((item: Question) => (
              <li key={item.id}>
                <li className={style.liQuestion}>{item.pergunta}</li>
                <li onClick={() => answerResponse(item.uuid, 'ruim')} className={style.liOption}>
                  <input
                    className={style.radioQuestion}
                    name={`${item.uuid} item `}
                    type='radio'
                    id={`${item.uuid} radioOptionRuim`}
                    checked={selectedAnswer[item.uuid] === 'ruim'}
                  />
                  <label className={style.labelQuestion} htmlFor={`${item.uuid} radioOptionRuim`}>
                    a) ruim
                  </label>
                </li>
                <li onClick={() => answerResponse(item.uuid, 'regular')} className={style.liOption}>
                  <input
                    className={style.radioQuestion}
                    name={`${item.uuid} item `}
                    type='radio'
                    id={`${item.uuid} radioOptionRegular`}
                    checked={selectedAnswer[item.uuid] === 'regular'}
                  />
                  <label className={style.labelQuestion} htmlFor={`${item.uuid} radioOptionRegular`}>
                    b) regular
                  </label>
                </li>
                <li onClick={() => answerResponse(item.uuid, 'bom')} className={style.liOption}>
                  <input
                    className={style.radioQuestion}
                    name={`${item.uuid} item `}
                    type='radio'
                    id={`${item.uuid} radioOptionBom`}
                    checked={selectedAnswer[item.uuid] === 'bom'}
                  />
                  <label className={style.labelQuestion} htmlFor={`${item.uuid} radioOptionBom`}>
                    c) bom
                  </label>
                </li>
                <li onClick={() => answerResponse(item.uuid, 'excelente')} className={style.liOption}>
                  <input
                    className={style.radioQuestion}
                    name={`${item.uuid} item `}
                    type='radio'
                    id={`${item.uuid} radioOptionExcelente`}
                    checked={selectedAnswer[item.uuid] === 'excelente'}
                  />
                  <label className={style.labelQuestion} htmlFor={`${item.uuid} radioOptionExcelente`}>
                    d) excelente
                  </label>
                </li>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.menuFinal}>
          <p className={style.thankyouQuestion} style={{ display: displayThankyou }}>
            Obrigado por responder o questionário de Clima Organizacional Magius! Não esqueça de pegar seu comprovante.
          </p>
        </div>
      </section>
    </>
  );
};
