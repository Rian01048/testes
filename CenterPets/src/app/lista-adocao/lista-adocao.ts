import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PetService } from '../pet';

@Component({
  selector: 'app-lista-adocao',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-adocao.html',
  styleUrl: './lista-adocao.css'
})
export class ListaAdocao implements OnInit {
  listaDePets: any[] = [];

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.listaDePets = this.petService.getPets('petsAdocao');
  }
}