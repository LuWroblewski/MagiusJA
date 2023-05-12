import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../connection';

export default async function callQuestionAmbienteCondicoes(req: NextApiRequest, res: NextApiResponse) {
  const { categoria } = req.body;

  try {
    const queryResult = await client.query(
      `SELECT SUM(ruim) as ruim, SUM(bom) as bom, SUM(regular) as regular, SUM(excelente) as excelente FROM perguntamultiplaescolha WHERE categoria = '${categoria}' `,
    );
    console.log(queryResult.rows);
    res.status(200).json(queryResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar dados do banco de dados' });
  }
}
