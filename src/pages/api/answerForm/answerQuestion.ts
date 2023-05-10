import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../connection';

export default async function callAllQuestions(req: NextApiRequest, res: NextApiResponse) {
  const { selectedAnswer } = req.body;

  const uuidsComNotaRuim = [];

  try {
    for (const [uuid, nota] of Object.entries(selectedAnswer)) {
      if (nota == 'ruim') {
        uuidsComNotaRuim.push(uuid);
        console.log(`A nota foi ${nota} da pergunta com o UUID ${uuid}`);
        const query = {
          text: `UPDATE perguntamultiplaescolha SET ruim = ruim + 1 WHERE uuid = $1;`,
          values: [uuid],
        };
        await client.query(query);
        console.log(`Adicionado +1 na categoria ruim da pergunta com o UUID de: ${uuid}`);
      } else if (nota == 'regular') {
        uuidsComNotaRuim.push(uuid);
        console.log(`A nota foi ${nota} da pergunta com o UUID ${uuid}`);
        const query = {
          text: `UPDATE perguntamultiplaescolha SET regular = regular + 1 WHERE uuid = $1;`,
          values: [uuid],
        };
        await client.query(query);
        console.log(`Adicionado +1 na categoria regular da pergunta com o UUID de: ${uuid}`);
      } else if (nota == 'bom') {
        uuidsComNotaRuim.push(uuid);
        console.log(`A nota foi ${nota} da pergunta com o UUID ${uuid}`);
        const query = {
          text: `UPDATE perguntamultiplaescolha SET bom = bom + 1 WHERE uuid = $1;`,
          values: [uuid],
        };
        await client.query(query);
        console.log(`Adicionado +1 na categoria bom da pergunta com o UUID de: ${uuid}`);
      } else if (nota == 'excelente') {
        uuidsComNotaRuim.push(uuid);
        console.log(`A nota foi ${nota} da pergunta com o UUID ${uuid}`);
        const query = {
          text: `UPDATE perguntamultiplaescolha SET excelente = excelente + 1 WHERE uuid = $1;`,
          values: [uuid],
        };
        await client.query(query);
        console.log(`Adicionado +1 na categoria excelente da pergunta com o UUID de: ${uuid}`);
      }
    }

    res.status(200).send(`Notas atualizadas com sucesso para os UUIDs: ${uuidsComNotaRuim.join(', ')}`);
  } catch (error) {
    console.error('Erro ao executar atualização:', error);
    res.status(500).send('Erro ao executar atualização');
  }
}
