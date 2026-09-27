import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PetService } from '../pet';

@Component({
  selector: 'app-lista-perdidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-perdidos.html',
  styleUrl: './lista-perdidos.css'
})
export class ListaPerdidosComponent implements OnInit {
  listaPerdidos: any[] = [];

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.listaPerdidos = this.petService.getPets('petsPerdidos');
  }
}