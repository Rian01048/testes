import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-info-pet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './info-pet.html',
  styleUrl: './info-pet.css'
})
export class InfoPetComponent implements OnInit {
  pet: any;
  modalAberto: boolean = false;

  ngOnInit() {
    // Puxa os dados que foram passados pelo botão da lista
    const dadosNavegacao = history.state;
    
    if (dadosNavegacao && dadosNavegacao.animalClicado) {
      this.pet = dadosNavegacao.animalClicado;
    } else {
      // Caso o utilizador atualize a página sem clicar num animal, mostramos dados vazios por segurança
      this.pet = { nome: 'Pet não encontrado', especie: '-', situacao: '-', bairro: '-', cidade: '-', contato: '-', imagem: '', preco: null };
    }
  }

  alternarModal() {
    this.modalAberto = !this.modalAberto;
  }
}