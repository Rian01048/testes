import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PetService } from '../pet';

@Component({
  selector: 'app-info-pet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-pet.html',
  styleUrl: './info-pet.css'
})
export class InfoPetComponent {
  pet: any;
  modalAberto: boolean = false;
  valorNumerico: number = 0;

  constructor(private petService: PetService, private router: Router) {
    this.pet = this.petService.petSelecionado;
    
    if (!this.pet) {
      this.router.navigate(['/inicio']);
    } else if (this.pet.preco) {
      this.valorNumerico = parseFloat(this.pet.preco.replace(',', '.'));
      if (isNaN(this.valorNumerico)) this.valorNumerico = 0;
    }
  }

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  confirmarCompra() {
    alert('Compra realizada com sucesso! O comprovante foi gerado e o animal adotado.');
    this.fecharModal();
    
    if (this.petService.atualizarBanco) this.petService.atualizarBanco(); // Atualiza se usar localStorage
    
    this.router.navigate(['/inicio']);
  }

  get valorTaxa() {
    return (this.valorNumerico * 0.10).toFixed(2).replace('.', ',');
  }

  get valorRepasse() {
    return (this.valorNumerico * 0.90).toFixed(2).replace('.', ',');
  }

  get valorTotal() {
    return this.valorNumerico.toFixed(2).replace('.', ',');
  }

  excluir() {
    if (confirm('Tem a certeza que deseja excluir?')) {
      this.petService.pets = this.petService.pets.filter(p => p !== this.pet);
      if (this.petService.atualizarBanco) this.petService.atualizarBanco();
      this.router.navigate(['/inicio']);
    }
  }

  voltar() {
    this.router.navigate(['/inicio']);
  }
}