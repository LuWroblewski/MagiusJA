import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './connection';

export default async function callAllQuestions(req: NextApiRequest, res: NextApiResponse) {
  const { table, question } = req.body;

  try {
    const query = {
      text: `DELETE FROM ${table} WHERE pergunta = $1`,
      values: [question],
    };
    await client.query(query);
    console.log('Exclusão realizada com sucesso!');
    res.status(200).send('Exclusão realizada com sucesso!');
  } catch (error) {
    console.error('Erro ao executar exclusão:', error);
    res.status(500).send('Erro ao executar exclusão');
  }
}
