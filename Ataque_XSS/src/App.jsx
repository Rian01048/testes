import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [form, setForm] = useState({ 
    nome: '', 
    email: '', 
    telefone: '', 
    senha: '', 
    codigo2FA: '' 
  });
  
  const [status, setStatus] = useState({ tipo: '', msg: '' });
  const [usuarios, setUsuarios] = useState([]);

  const buscarUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:3001/usuarios');
      if (res.ok) {
        const dados = await res.json();
        setUsuarios(dados);
      }
    } catch (err) {
      console.error("Erro ao carregar lista de usuários:", err);
    }
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ tipo: 'info', msg: 'Processando cadastro...' });

    try {
      const resposta = await fetch('http://localhost:3001/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || 'Falha no cadastro.');
      }

      setStatus({ tipo: 'sucesso', msg: dados.mensagem });
      setForm({ nome: '', email: '', telefone: '', senha: '', codigo2FA: '' });
      buscarUsuarios();
      
    } catch (err) {
      setStatus({ tipo: 'erro', msg: err.message });
    }
  };

  return (
    <div className="container">
      
      {/* CARD DE CADASTRO */}
      <div className="cadastro-card">
        <h2 className="cadastro-title">Sistema de Cadastro</h2>
        <p className="cadastro-subtitle">Envio de dados para o servidor Node.js</p>

        {status.msg && (
          <div className={`status-alert ${status.tipo}`}>
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome Completo (Campo de Teste XSS)</label>
            <input 
              type="text" 
              name="nome" 
              className="form-input"
              value={form.nome} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input 
              type="email" 
              name="email" 
              className="form-input"
              value={form.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Telefone</label>
            <input 
              type="tel" 
              name="telefone" 
              className="form-input"
              placeholder="(11) 99999-9999"
              value={form.telefone} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Senha Forte</label>
            <input 
              type="password" 
              name="senha" 
              className="form-input"
              placeholder="Ex: Seguranca@2026"
              value={form.senha} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Código 2FA de Segurança</label>
            <input 
              type="text" 
              name="codigo2FA" 
              className="form-input"
              placeholder="Digite: 123456"
              value={form.codigo2FA} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="btn-submit">
            Cadastrar Usuário
          </button>
        </form>
      </div>

      {/* CARD DE EXIBIÇÃO E TESTE DE XSS */}
      <div className="cadastro-card list-card">
        <h3 className="cadastro-title">Usuários Salvos no Banco</h3>
        <p className="cadastro-subtitle">Comparação de Renderização Segura vs Vulnerável</p>

        <button onClick={buscarUsuarios} className="btn-refresh">
          🔄 Atualizar Lista
        </button>

        <div className="user-list">
          {usuarios.length === 0 ? (
            <p className="empty-msg">Nenhum usuário cadastrado.</p>
          ) : (
            usuarios.map((u) => (
              <div key={u.id} className="user-item">
                <p className="user-meta">ID: {u.id} | Email: {u.email}</p>
                
                <div className="render-block safe-block">
                  <strong>1. Renderização Padrão React (Segura):</strong>
                  <div>{u.nome}</div>
                </div>

                <div className="render-block vuln-block">
                  <strong>2. Renderização via HTML cru (Vulnerável):</strong>
                  <div dangerouslySetInnerHTML={{ __html: u.nome }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}