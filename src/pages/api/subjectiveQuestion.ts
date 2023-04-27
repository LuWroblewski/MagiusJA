import type { NextApiRequest, NextApiResponse } from 'next';
import { transporter } from './connection';
import { client } from './connection';

export default async function callAllQuestions(req: NextApiRequest, res: NextApiResponse) {
  const { question } = req.body;

  const user = process.env.USER_EMAIL;
  const userEmail = process.env.USER_EMAILTESTE;

  transporter.sendMail({
    from: `siteFormulario <${userEmail}>`,
    to: `${user}`,
    subject: 'Mensagem do site',
    html: `<div style= "border: 4px; border-style: solid; border-color: rgb(93, 85, 133); width: 500px; height: 100%; background-color: rgb(127, 117, 179)" >
<h2 style="font-family: roboto-condesed; color: rgb(255, 255, 255); text-align: center;" >Adicionado pergunta ao formulario</h2>
<p style="font-family: roboto-condesed; color: rgb(255, 255, 255);  text-align: center; font-size: large;"  >Pergunta do formulario:  ${question}</p>
</div> `,
  });

  try {
    const query = {
      text: 'INSERT INTO respostasubjetiva(pergunta) VALUES($1)',
      values: [question],
    };
    await client.query(query);
    console.log('Inserção realizada com sucesso!');
    res.status(200).send('Inserção realizada com sucesso!');
  } catch (error) {
    console.error('Erro ao executar inserção:', error);
    res.status(500).send('Erro ao executar inserção');
  }
}
