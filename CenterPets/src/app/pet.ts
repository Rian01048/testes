import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PetService {
  pets: any[] = JSON.parse(localStorage.getItem('banco_pets') || '[]');
  
  petSelecionado: any = null;

  atualizarBanco() {
    localStorage.setItem('banco_pets', JSON.stringify(this.pets));
  }
}