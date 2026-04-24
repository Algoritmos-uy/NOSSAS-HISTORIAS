import { Router } from 'express';
import { produtos } from '../data/dados.js';

const router = Router();

router.get('/', (_req, res) => {
  const { tipo } = _req.query;
  let resultado = [...produtos].filter(p => p.disponivel);
  if (tipo) resultado = resultado.filter(p => p.tipo === tipo);
  res.json({ sucesso: true, total: resultado.length, dados: resultado });
});

router.get('/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado' });
  res.json({ sucesso: true, dados: produto });
});

export default router;
