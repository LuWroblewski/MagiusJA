import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './connection';

export default async function callAllQuestions(req: NextApiRequest, res: NextApiResponse) {
  const { table, question, newQuestion } = req.body;

  try {
    const query = {
      text: `UPDATE ${table} SET pergunta = $1 WHERE pergunta = $2`,
      values: [newQuestion, question],
    };
    await client.query(query);
    console.log('Atualização realizada com sucesso!');
    res.status(200).send('Atualização realizada com sucesso!');
  } catch (error) {
    console.error('Erro ao executar atualização:', error);
    res.status(500).send('Erro ao executar atualização');
  }
}
