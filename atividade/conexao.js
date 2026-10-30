const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function inicializarBanco() {
    try {
        const connection = await db.getConnection();
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                senha VARCHAR(255) NOT NULL,
                codigo_recuperacao VARCHAR(6),
                expiracao_codigo DATETIME,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        await connection.query(createUsersTable);
        console.log('✅ Tabela "usuarios" verificada/criada com sucesso.');
        connection.release();
    } catch (error) {
        console.error('❌ Erro ao inicializar o banco de dados:', error);
    }
}

inicializarBanco();

module.exports = db;