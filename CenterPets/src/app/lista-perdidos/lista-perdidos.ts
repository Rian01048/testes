import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PetService } from '../pet';

@Component({
  selector: 'app-lista-perdidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-perdidos.html',
  styleUrl: './lista-perdidos.css'
})
export class ListaPerdidosComponent {
  termoPesquisa: string = '';
  petsFiltrados: any[] = [];

  constructor(private petService: PetService, private router: Router) {
    this.atualizarLista();
  }

  atualizarLista() {
    this.petsFiltrados = this.petService.pets.filter(p => p.situacao === 'Perdido');
  }

  pesquisar() {
    const termo = this.termoPesquisa.toLowerCase().trim();
    const todosPerdidos = this.petService.pets.filter(p => p.situacao === 'Perdido');
    
    if (termo === '') {
      this.petsFiltrados = todosPerdidos;
    } else {
      this.petsFiltrados = todosPerdidos.filter(pet => 
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