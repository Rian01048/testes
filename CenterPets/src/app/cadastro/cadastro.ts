import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {}

  realizarCadastro() {
    if(this.email && this.senha && this.nome) {
      this.authService.cadastrar({ nome: this.nome, email: this.email, senha: this.senha });
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']);
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  }
}