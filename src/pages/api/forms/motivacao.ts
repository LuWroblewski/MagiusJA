import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../connection';

export default async function callQuestionMotivacao(req: NextApiRequest, res: NextApiResponse) {
  try {
    const queryResult = await client.query("SELECT * FROM perguntamultiplaescolha WHERE categoria = 'motivacao'");
    console.log(queryResult.rows);
    res.status(200).json(queryResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar dados do banco de dados' });
  }
}
