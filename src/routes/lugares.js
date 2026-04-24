import { Router } from 'express';
import { lugares } from '../data/dados.js';

const router = Router();

router.get('/', (_req, res) => {
  const { categoria, pais } = _req.query;
  let resultado = [...lugares];
  if (categoria) resultado = resultado.filter(l => l.categoria === categoria);
  if (pais) resultado = resultado.filter(l => l.pais.toLowerCase() === pais.toLowerCase());
  res.json({ sucesso: true, total: resultado.length, dados: resultado });
});

router.get('/:id', (req, res) => {
  const lugar = lugares.find(l => l.id === parseInt(req.params.id));
  if (!lugar) return res.status(404).json({ sucesso: false, mensagem: 'Lugar não encontrado' });
  res.json({ sucesso: true, dados: lugar });
});

export default router;
