import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {}

  realizarLogin() {
    const sucesso = this.authService.login(this.email, this.senha);
    if (sucesso) {
      this.router.navigate(['/inicio']);
    } else {
      alert('E-mail ou palavra-passe incorretos.');
    }
  }
}