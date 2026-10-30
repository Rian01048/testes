const API_URL = 'http://localhost:3000/api';
let emailRecuperacaoGlobal = '';
let codigoRecuperacaoGlobal = '';

function toggleSection(sectionId) {
    document.querySelectorAll('.form-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// 1. Cadastro
document.getElementById('form-register').addEventListener('submit', async(e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const senha = document.getElementById('reg-senha').value;

    const res = await fetch(`${API_URL}/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const data = await res.json();
    alert(data.message || data.error);
    if (res.ok) toggleSection('login-section');
});

// 2. Login
document.getElementById('form-login').addEventListener('submit', async(e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const data = await res.json();
    alert(data.message || data.error);
});

// 3. Solicitar Código
document.getElementById('form-forgot').addEventListener('submit', async(e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    emailRecuperacaoGlobal = email;

    const btn = document.getElementById('btn-send-code');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    const res = await fetch(`${API_URL}/esqueci-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const data = await res.json();
    btn.textContent = 'Enviar Código';
    btn.disabled = false;

    if (res.ok) {
        toggleSection('verify-section');
        document.querySelector('.otp-input').focus(); // Foca na primeira caixa
    } else {
        alert(data.error);
    }
});

// Lógica das caixinhas OTP (Pular para o lado, apagar, etc)
const otpInputs = document.querySelectorAll('.otp-input');
otpInputs.forEach((input, index) => {
    input.addEventListener('keyup', (e) => {
        const currentInput = input;
        const nextInput = input.nextElementSibling;
        const prevInput = input.previousElementSibling;

        // Se digitou um número, pula pro próximo
        if (currentInput.value.length > 1) {
            currentInput.value = currentInput.value.slice(0, 1);
        }
        if (e.key >= 0 && e.key <= 9 && nextInput) {
            nextInput.focus();
        }
        // Se apagou, volta pro anterior
        if (e.key === 'Backspace' && prevInput) {
            prevInput.focus();
        }
    });
});

// 4. Validar Código (Transição Front-end)
document.getElementById('btn-verify-code').addEventListener('click', () => {
    // Junta os 6 valores das caixinhas
    let codigoDigitado = '';
    otpInputs.forEach(input => codigoDigitado += input.value);

    if (codigoDigitado.length === 6) {
        codigoRecuperacaoGlobal = codigoDigitado;
        toggleSection('reset-section');
    } else {
        alert('Por favor, insira os 6 dígitos do código.');
    }
});

// 5. Salvar Nova Senha (Envia e-mail, código e senha pro Back-end)
document.getElementById('form-reset').addEventListener('submit', async(e) => {
    e.preventDefault();
    const novaSenha = document.getElementById('reset-senha').value;

    const res = await fetch(`${API_URL}/redefinir-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: emailRecuperacaoGlobal,
            codigo: codigoRecuperacaoGlobal,
            novaSenha: novaSenha
        })
    });

    const data = await res.json();
    alert(data.message || data.error);

    if (res.ok) {
        toggleSection('login-section');
        // Limpa os dados
        document.getElementById('form-reset').reset();
        otpInputs.forEach(input => input.value = '');
    }
});