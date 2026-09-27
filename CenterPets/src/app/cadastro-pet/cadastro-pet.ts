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
  especieSelecionada: string = '';
  situacaoSelecionada: string = 'Adocao';
  imagemBase64: string = '';

  nome: string = '';
  bairro: string = '';
  cidade: string = '';
  tel: string = '';
  preco: string = '';

  constructor(private petService: PetService, private router: Router) {}

  selecionarEspecie(especie: string) { this.especieSelecionada = especie; }
  selecionarSituacao(situacao: string) { this.situacaoSelecionada = situacao; }

  // Converte a imagem carregada para Base64 (texto) para ser guardada
  processarImagem(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemBase64 = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  publicar() {
    if (!this.especieSelecionada || !this.imagemBase64) {
      alert('Por favor, selecione a espécie e insira uma imagem.');
      return;
    }

    const novoPet = {
      nome: this.nome,
      especie: this.especieSelecionada,
      situacao: this.situacaoSelecionada === 'Adocao' ? 'Para adoção' : 'Perdido',
      bairro: this.bairro,
      cidade: this.cidade,
      contato: this.tel,
      preco: this.preco,
      imagem: this.imagemBase64
    };

    if (this.situacaoSelecionada === 'Adocao') {
      this.petService.adicionarPet(novoPet, 'petsAdocao');
      this.router.navigate(['/lista-adocao']);
    } else {
      this.petService.adicionarPet(novoPet, 'petsPerdidos');
      this.router.navigate(['/lista-perdidos']);
    }
  }
}