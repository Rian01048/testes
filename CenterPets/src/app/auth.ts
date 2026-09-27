import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  cadastrar(utilizador: any) {
    const utilizadores = JSON.parse(localStorage.getItem('utilizadores') || '[]');
    utilizadores.push(utilizador);
    localStorage.setItem('utilizadores', JSON.stringify(utilizadores));
  }

  login(email: string, senha: string): boolean {
    const utilizadores = JSON.parse(localStorage.getItem('utilizadores') || '[]');
    return utilizadores.some((u: any) => u.email === email && u.senha === senha);
  }
}