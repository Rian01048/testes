import React, { useState } from 'react';
import './App.css'; 

export default function CenterPets() {
    // 1. Estados simplificados
    const [pagina, setPagina] = useState('tela-inicio');
    const [menuAtivo, setMenuAtivo] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [especie, setEspecie] = useState('');
    const [situacao, setSituacao] = useState('');

    // 2. Função única para navegação
    const navegar = (novaPagina) => {
        setPagina(novaPagina);
        setMenuAtivo(false); // Fecha o menu ao trocar de tela
    };

    return (
        <>
            {/* ================= HEADER E MENU ================= */}
            <button id="menu-btn" className="hamburger" onClick={() => setMenuAtivo(!menuAtivo)}>
                ☰
            </button>

            {menuAtivo && <div id="overlay" className="active" onClick={() => setMenuAtivo(false)}></div>}

            <nav id="menu" className={`sidebar ${menuAtivo ? "active" : ""}`}>
                <div className="logo">
                    <img src="https://static.vecteezy.com/system/resources/previews/009/385/339/non_2x/cat-paw-clipart-design-illustration-free-png.png" alt="" />
                    <h2>CenterPets</h2>
                </div>
                <ul>
                    <li><a href="#inicio" className={pagina === 'tela-inicio' ? "ativo" : ""} onClick={() => navegar('tela-inicio')}>Início</a></li>
                    <li><a href="#login" onClick={() => navegar('tela-login')}>Login</a></li>
                    <li><a href="#cadastro" onClick={() => navegar('tela-cadastro')}>Cadastro</a></li>
                </ul>
            </nav>

            {/* ================= TELAS (Exibe apenas a tela ativa) ================= */}
            
            {pagina === 'tela-inicio' && (
                <section id="tela-inicio" className="pagina ativa">
                    <main className="inicio">
                        <div className="container">
                            <div className="logo">
                                <img src="https://static.vecteezy.com/system/resources/previews/009/385/339/non_2x/cat-paw-clipart-design-illustration-free-png.png" alt="" />
                            </div>
                            <h1>CenterPets</h1>
                            <p>Encontre um novo amigo ou ajude um pet a voltar pra casa.</p>
                            <div className="btn">
                                <button className="adotar" onClick={() => navegar('tela-anuncio_adocao')}>Quero adotar</button>
                                <button className="perdidos" onClick={() => navegar('tela-anuncio_perdido')}>Animais perdidos</button>
                                <button className="publicar" onClick={() => navegar('tela-cadastro_pet')}>Publicar animal</button>
                            </div>
                        </div>
                    </main>
                </section>
            )}

            {pagina === 'tela-login' && (
                <section id="tela-login" className="pagina ativa">
                    <main className="inicio">
                        <div className="container">
                            <div className="logo">
                                <img src="https://static.vecteezy.com/system/resources/previews/009/385/339/non_2x/cat-paw-clipart-design-illustration-free-png.png" alt="" />
                                <h2>CenterPets</h2>
                            </div>
                            <form className="card" onSubmit={(e) => e.preventDefault()}>
                                <h1>Login</h1>
                                <p className="descricao">Entre na sua conta para continuar</p>

                                <label htmlFor="loginEmail">E-mail</label>
                                <input type="text" id="loginEmail" placeholder="Digite seu e-mail" />

                                <label htmlFor="loginSenha">Senha</label>
                                <input type="password" id="loginSenha" placeholder="Digite sua senha" />

                                <a className="esqueci" href="#esqueci">Esqueci minha senha</a>

                                <button type="submit">🐾 Entrar</button>

                                <div className="divisor"><span>ou</span></div>
                                <p className="rodape-form">Não tem uma conta? <a href="#criar" onClick={() => navegar('tela-cadastro')}>Criar conta</a></p>
                            </form>
                        </div>
                    </main>
                </section>
            )}

            {pagina === 'tela-cadastro' && (
                <section id="tela-cadastro" className="pagina ativa">
                    <main className="inicio">
                        <div className="container">
                            <div className="logo">
                                <img src="https://static.vecteezy.com/system/resources/previews/009/385/339/non_2x/cat-paw-clipart-design-illustration-free-png.png" alt="" />
                                <h2>CenterPets</h2>
                            </div>
                            <form className="card" onSubmit={(e) => e.preventDefault()}>
                                <h1>Cadastro de usuário</h1>
                                <p className="descricao">Preencha os dados abaixo para criar sua conta</p>

                                <label htmlFor="nomeCompleto">Nome completo</label>
                                <input type="text" id="nomeCompleto" placeholder="Digite seu nome completo" />

                                <div className="linha">
                                    <div className="campo">
                                        <label htmlFor="cadastroEmail">E-mail</label>
                                        <input type="text" id="cadastroEmail" placeholder="Digite seu e-mail" />
                                    </div>
                                    <div className="campo">
                                        <label htmlFor="numTel">Telefone (opcional)</label>
                                        <input type="tel" id="numTel" placeholder="(00) 00000-0000" />
                                    </div>
                                </div>

                                <div className="linha">
                                    <div className="campo">
                                        <label htmlFor="cadastroSenha">Senha</label>
                                        <input type="password" id="cadastroSenha" placeholder="Digite sua senha" />
                                    </div>
                                    <div className="campo">
                                        <label htmlFor="confirmarSenha">Confirmar senha</label>
                                        <input type="password" id="confirmarSenha" placeholder="Confirme sua senha" />
                                    </div>
                                </div>

                                <button type="submit">🐾 Entrar</button>

                                <div className="divisor"><span>ou</span></div>
                                <p className="rodape-form">Já tem uma conta? <a href="#voltar" onClick={() => navegar('tela-login')}>Voltar para login</a></p>
                            </form>
                        </div>
                    </main>
                </section>
            )}

            {pagina === 'tela-anuncio_adocao' && (
                <section id="tela-anuncio_adocao" className="pagina ativa">
                    <main className="inicio">
                        <div className="container lista">
                            <h2>Anúncios</h2>
                            <input type="text" className="busca" placeholder="Buscar cidade ou bairro..." />

                            <div className="card-pet">
                                <img src="https://www.petz.com.br/blog/wp-content/uploads/2021/09/dia-mundial-dos-animais-topo.jpg" alt="Mel" />
                                <div className="info-pet">
                                    <h3>Mel</h3>
                                    <p>Gato <span className="status adocao-texto">• Para adoção</span></p>
                                    <p className="bairro">Bairro: Cajazeiras</p>
                                </div>
                                <button className="ver-info adocao-btn" onClick={() => navegar('info-gato')}>Ver informações</button>
                            </div>

                            <div className="card-pet">
                                <img src="https://www.infoescola.com/wp-content/uploads/2010/08/husky-siberiano_71212480.jpg" alt="Chinego" />
                                <div className="info-pet">
                                    <h3>Chinego</h3>
                                    <p>Cachorro <span className="status adocao-texto">• Para adoção</span></p>
                                    <p className="bairro">Bairro: Barra</p>
                                </div>
                                <button className="ver-info adocao-btn" onClick={() => navegar('info-dog-premium')}>Ver informações</button>
                            </div>
                        </div>
                    </main>
                </section>
            )}

            {pagina === 'tela-anuncio_perdido' && (
                <section id="tela-anuncio_perdido" className="pagina ativa">
                    <main className="inicio">
                        <div className="container lista">
                            <h2>Anúncios</h2>
                            <input type="text" className="busca" placeholder="Buscar cidade ou bairro..." />
                            
                            <div className="card-pet">
                                <img src="https://www.petz.com.br/blog/wp-content/uploads/2020/04/meu-primeiro-cachorro-pet.jpg" alt="Bitelo" />
                                <div className="info-pet">
                                    <h3>Bitelo</h3>
                                    <p className="status perdido-texto">Perdido</p>
                                    <p className="bairro">Bairro: Piatã</p>
                                </div>
                                <button className="ver-info perdido-btn" onClick={() => navegar('info-dog-comum')}>Ver informações</button>
                            </div>
                        </div>
                    </main>
                </section>
            )}

            {pagina === 'info-gato' && (
                <section id="info-gato" className="pagina ativa">
                    <main className="inicio">
                        <div className="container">
                            <div className="card info-animal">
                                <h1>Informações do animal</h1>
                                <img src="https://www.petz.com.br/blog/wp-content/uploads/2021/09/dia-mundial-dos-animais-topo.jpg" alt="Mel" />
                                <h2 className="nome-animal adocao-texto">Mel</h2>

                                <div className="dados">
                                    <p><strong>Espécie:</strong> Gato</p>
                                    <p><strong>Situação:</strong> <span className="adocao-texto">Para adoção</span></p>
                                    <p><strong>Bairro:</strong> Cajazeiras</p>
                                    <p><strong>Cidade:</strong> Salvador</p>
                                    <p><strong>Contato:</strong> (71) 99999-9999</p>
                                </div>

                                <button className="contato">🐾 Entrar em contato</button>

                                <div className="acoes">
                                    <button className="excluir">Excluir</button>
                                    <button className="editar">Editar</button>
                                </div>
                            </div>
                        </div>
                    </main>
                </section>
            )}

            {pagina === 'info-dog-comum' && (
                <section id="info-dog-comum" className="pagina ativa">
                    <main className="inicio">
                        <div className="container">
                            <div className="card info-animal">
                                <h1>Informações do animal</h1>
                                <img src="https://www.petz.com.br/blog/wp-content/uploads/2020/04/meu-primeiro-cachorro-pet.jpg" alt="Bitelo" />
                                <h2 className="nome-animal perdido-texto">Bitelo</h2>

                                <div className="dados">
                                    <p><strong>Espécie:</strong> Cachorro</p>
                                    <p><strong>Situação:</strong> <span className="perdido-texto">Perdido</span></p>
                                    <p><strong>Bairro:</strong> Piatã</p>
                                    <p><strong>Cidade:</strong> Salvador</p>
                                    <p><strong>Contato:</strong> (71) 99999-9999</p>
                                </div>

                                <button className="contato">🐾 Entrar em contato</button>

                                <div className="acoes">
                                    <button className="excluir">Excluir</button>
                                    <button className="editar">Editar</button>
                                </div>
                            </div>
                        </div>
                    </main>
                </section>
            )}

            {pagina === 'info-dog-premium' && (
                <section id="info-dog-premium" className="pagina ativa">
                    <main className="inicio">
                        <div className="container">
                            <div className="card info-animal">
                                <h1>Informações do animal</h1>
                                <img src="https://www.infoescola.com/wp-content/uploads/2010/08/husky-siberiano_71212480.jpg" alt="Chinego" />
                                <h2 className="nome-animal adocao-texto">Chinego</h2>

                                <div className="dados">
                                    <p><strong>Espécie:</strong> Cachorro</p>
                                    <p><strong>Situação:</strong> <span className="adocao-texto">Adoção</span></p>
                                    <p><strong>Bairro:</strong> Piatã</p>
                                    <p><strong>Cidade:</strong> Salvador</p>
                                    <p><strong>Contato:</strong> (71) 99999-9999</p>
                                </div>

                                <div className="preco">
                                    <p>Valor para adoção</p>
                                    <strong>R$ 200</strong>
                                </div>

                                <button className="contato" onClick={() => setModalAberto(true)}>Compre agora!!</button>

                                <div className="acoes">
                                    <button className="excluir">Excluir</button>
                                    <button className="editar">Editar</button>
                                </div>
                            </div>
                        </div>
                    </main>
                </section>
            )}

            {pagina === 'tela-cadastro_pet' && (
                <section id="tela-cadastro_pet" className="pagina ativa">
                    <main className="inicio">
                        <div className="container">
                            <form className="card" onSubmit={(e) => e.preventDefault()}>
                                <h2>Publicar Animal</h2>

                                <label htmlFor="nomeAnimal">Nome (opcional)</label>
                                <input type="text" id="nomeAnimal" placeholder="Digite o nome do animal" />

                                <label>Espécie</label>
                                <div className="opcoes">
                                    <button type="button" className={`opcao ${especie === 'Cachorro' ? 'selecionado' : ''}`} onClick={() => setEspecie('Cachorro')}>🐶 Cachorro</button>
                                    <button type="button" className={`opcao ${especie === 'Gato' ? 'selecionado' : ''}`} onClick={() => setEspecie('Gato')}>😺 Gato</button>
                                </div>

                                <label>Situação</label>
                                <div className="opcoes">
                                    <button type="button" className={`opcao ${situacao === 'Para adoção' ? 'selecionado' : ''}`} onClick={() => setSituacao('Para adoção')}>Para adoção</button>
                                    <button type="button" className={`opcao ${situacao === 'Perdido' ? 'selecionado' : ''}`} onClick={() => setSituacao('Perdido')}>Perdido</button>
                                </div>

                                <label htmlFor="bairro">Bairro</label>
                                <input type="text" id="bairro" placeholder="Digite o bairro" />

                                <label htmlFor="cidade">Cidade</label>
                                <input type="text" id="cidade" placeholder="Digite a cidade" />

                                <label htmlFor="tel">Telefone</label>
                                <input type="tel" id="tel" placeholder="(00) 00000-0000" />

                                <button type="submit" className="publicar-btn">🐾 Publicar</button>
                            </form>
                        </div>
                    </main>
                </section>
            )}

            {/* ================= MODAL DE PAGAMENTO ================= */}
            {modalAberto && (
                <div id="modalNotaFiscal" className="modal-overlay" style={{ display: 'flex' }} onClick={(e) => e.target.id === 'modalNotaFiscal' && setModalAberto(false)}>
                    <div className="modal-content">
                        <span className="fechar" onClick={() => setModalAberto(false)}>x</span>
                        <h2>Resumo da Transação</h2>
                        
                        <div className="dados-empresa">
                            <p><strong>Plataforma AdoteFácil</strong></p>
                            <p>Transparência em cada adoção</p>
                        </div>
                        
                        <hr className="linha-tracejada" />
                        
                        <div className="nota-detalhes">
                            <div className="item-nota"><span>Valor base (Chinego)</span><span>R$ 200,00</span></div><br/>
                            <div className="item-nota repasse"><span>Repasse à Instituição (92%)</span><span>R$ 184,00</span></div>
                            <div className="item-nota taxa"><span>Taxa da Plataforma (8%)</span><span>R$ 16,00</span></div>
                        </div>
                        
                        <hr className="linha-tracejada" />
                        
                        <div className="item-nota valor-final">
                            <span><strong>Total a Pagar</strong></span><span><strong>R$ 200,00</strong></span>
                        </div>
                        
                        <button className="btn-confirmar" onClick={() => {
                            alert("Pagamento processado com sucesso!");
                            setModalAberto(false);
                        }}>Confirmar Pagamento</button>
                    </div>
                </div>
            )}
        </>
    );
}