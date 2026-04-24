import { Router } from 'express';
import { historias, curiosidades } from '../data/dados.js';

const router = Router();

router.get('/', (_req, res) => {
  const { categoria, destaque } = _req.query;
  let resultado = [...historias];
  if (categoria) resultado = resultado.filter(h => h.categoria === categoria);
  if (destaque === 'true') resultado = resultado.filter(h => h.destaque);
  res.json({ sucesso: true, total: resultado.length, dados: resultado });
});

router.get('/curiosidades', (_req, res) => {
  res.json({ sucesso: true, total: curiosidades.length, dados: curiosidades });
});

router.get('/:slug', (req, res) => {
  const historia = historias.find(h => h.slug === req.params.slug);
  if (!historia) return res.status(404).json({ sucesso: false, mensagem: 'História não encontrada' });
  res.json({ sucesso: true, dados: historia });
});

export default router;
