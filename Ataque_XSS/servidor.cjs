const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors()); // Permite a comunicação com o React
app.use(express.json()); // Entende os dados recebidos

// 1. Configuração da conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root', // Geralmente é root. Altere se o seu for diferente
    password: '9751405Ri#', // Coloque sua senha do MySQL entre as aspas (se tiver)
    database: 'teste' // O nome do banco que você informou
});

// 2. Conectando e criando a tabela caso ela não exista
db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar no MySQL. Verifique se ele está ligado e a senha correta.", err.message);
        return;
    }
    console.log("✅ Conectado ao banco de dados MySQL 'teste'!");

    // Comando SQL para garantir que a tabela 'usuarios' existe
    const sqlCriarTabela = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            telefone VARCHAR(20),
            senha VARCHAR(255)
        )
    `;

    db.query(sqlCriarTabela, (err) => {
        if (err) {
            console.error("Erro ao criar a tabela:", err.message);
        } else {
            console.log("✅ Tabela 'usuarios' pronta para uso!");
        }
    });
});

// 3. A rota que recebe os dados do React
app.post('/cadastrar', (req, res) => {
    const { nome, email, telefone, senha } = req.body;

    // Como não há sanitização aqui, o payload XSS vai direto para o banco!
    const sql = `INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)`;

    db.query(sql, [nome, email, telefone, senha], (err, result) => {
        if (err) {
            console.error("Erro ao inserir:", err.message);
            // ER_DUP_ENTRY é o código do MySQL para quando tentam cadastrar algo que já existe (como o email)
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ mensagem: "Este e-mail já está cadastrado!" });
            }
            return res.status(500).json({ mensagem: "Erro no servidor." });
        }
        console.log(`Novo usuário cadastrado com ID: ${result.insertId}`);
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    });
});

// =========================================================================
// ROTA ADICIONADA: Necessária para o React puxar os dados e disparar o XSS
// =========================================================================
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar usuários:", err.message);
            return res.status(500).json({ mensagem: "Erro ao buscar usuários." });
        }
        res.json(results);
    });
});

// 4. Inicia o servidor
app.listen(3001, () => {
    console.log("🚀 Servidor backend rodando em http://localhost:3001");
});