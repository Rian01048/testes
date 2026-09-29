import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PetService } from '../pet';

@Component({
  selector: 'app-cadastro-pet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-pet.html',
  styleUrl: './cadastro-pet.css'
})
export class CadastroPetComponent {
  novoPet = { nome: '', especie: 'Cachorro', situacao: 'Adoção', bairro: '', cidade: '', tel: '', preco: '', imagem: '' };

  constructor(private petService: PetService, private router: Router) {}

  processarImagem(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.novoPet.imagem = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  publicar() {
    if (!this.novoPet.imagem) {
      alert('Adicione uma foto do animal!');
      return;
    }
    
    this.petService.pets.push(this.novoPet);
    
    this.petService.atualizarBanco();
    
    if (this.novoPet.situacao === 'Adoção') {
      this.router.navigate(['/lista-adocao']);
    } else {
      this.router.navigate(['/lista-perdidos']);
    }
  }
}