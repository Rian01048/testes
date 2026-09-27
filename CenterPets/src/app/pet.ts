import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PetService {
  getPets(tipo: string) {
    return JSON.parse(localStorage.getItem(tipo) || '[]');
  }

  adicionarPet(pet: any, tipo: string) {
    const pets = this.getPets(tipo);
    pets.push(pet);
    localStorage.setItem(tipo, JSON.stringify(pets));
  }
}