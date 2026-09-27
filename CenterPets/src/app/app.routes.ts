import { Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio';
import { LoginComponent } from './login/login';
import { CadastroComponent } from './cadastro/cadastro';
import { ListaAdocao } from './lista-adocao/lista-adocao';
import { ListaPerdidosComponent } from './lista-perdidos/lista-perdidos';
import { InfoPetComponent } from './info-pet/info-pet';
import { CadastroPetComponent } from './cadastro-pet/cadastro-pet';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'lista-adocao', component: ListaAdocao },
  { path: 'lista-perdidos', component: ListaPerdidosComponent },
  { path: 'info-pet', component: InfoPetComponent },
  { path: 'cadastro-pet', component: CadastroPetComponent },
  { path: '**', redirectTo: 'inicio' }
];