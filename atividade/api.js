const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const db = require('./conexao');

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/cadastro', async(req, res) => {
    const { email, senha } = req.body;
    try {
        const hashSenha = await bcrypt.hash(senha, 10);
        await db.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, hashSenha]);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'E-mail já cadastrado.' });
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
});

router.post('/login', async(req, res) => {
    const { email, senha } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' });

        const usuario = rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta.' });
        res.status(200).json({ message: 'Login realizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao realizar login.' });
    }
});

router.post('/esqueci-senha', async(req, res) => {
    const { email } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(404).json({ error: 'E-mail não cadastrado.' });

        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        const expiracao = new Date(Date.now() + 15 * 60 * 1000);
        await db.query('UPDATE usuarios SET codigo_recuperacao = ?, expiracao_codigo = ? WHERE email = ?', [codigo, expiracao, email]);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Código de Recuperação de Senha',
            text: `Seu código de verificação é: ${codigo}\n\nEle expira em 15 minutos.`
        });

        res.status(200).json({ message: 'Código enviado para o e-mail.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar e-mail.' });
    }
});

router.post('/redefinir-senha', async(req, res) => {
    const { email, codigo, novaSenha } = req.body;
    try {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE email = ? AND codigo_recuperacao = ? AND expiracao_codigo > NOW()', [email, codigo]
        );

        if (rows.length === 0) return res.status(400).json({ error: 'Código inválido ou expirado.' });

        const hashSenha = await bcrypt.hash(novaSenha, 10);
        await db.query(
            'UPDATE usuarios SET senha = ?, codigo_recuperacao = NULL, expiracao_codigo = NULL WHERE email = ?', [hashSenha, email]
        );

        res.status(200).json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao redefinir senha.' });
    }
});

module.exports = router;