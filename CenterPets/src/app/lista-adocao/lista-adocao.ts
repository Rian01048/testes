import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importante para a pesquisa funcionar
import { Router } from '@angular/router';
import { PetService } from '../pet';

@Component({
  selector: 'app-lista-adocao',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicionado o FormsModule aqui
  templateUrl: './lista-adocao.html',
  styleUrl: './lista-adocao.css'
})
export class ListaAdocaoComponent {
  termoPesquisa: string = '';
  petsFiltrados: any[] = [];

  constructor(private petService: PetService, private router: Router) {
    this.atualizarLista();
  }

  // Carrega a lista completa ao abrir a página
  atualizarLista() {
    this.petsFiltrados = this.petService.pets.filter(p => p.situacao === 'Adoção' || p.situacao === 'Para adoção');
  }

  // Função acionada pelo botão de "Buscar"
  pesquisar() {
    const termo = this.termoPesquisa.toLowerCase().trim();
    const todosAdocao = this.petService.pets.filter(p => p.situacao === 'Adoção' || p.situacao === 'Para adoção');
    
    if (termo === '') {
      this.petsFiltrados = todosAdocao;
    } else {
      this.petsFiltrados = todosAdocao.filter(pet => 
        (pet.bairro && pet.bairro.toLowerCase().includes(termo)) || 
        (pet.cidade && pet.cidade.toLowerCase().includes(termo))
      );
    }
  }

  abrirInfo(petClicado: any) {
    this.petService.petSelecionado = petClicado;
    this.router.navigate(['/info-pet']);
  }
}