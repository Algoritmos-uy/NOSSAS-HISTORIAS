import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ sucesso: false, mensagem: 'Preencha todos os campos obrigatórios.' });
  }
  // Aqui poderia integrar com nodemailer ou outro serviço de e-mail
  console.log(`[CONTATO] De: ${nome} <${email}> | Assunto: ${assunto || 'Geral'}`);
  res.json({
    sucesso: true,
    mensagem: 'Mensagem recebida! Ricardo e Tami vão te responder em breve. 🚙'
  });
});

export default router;
