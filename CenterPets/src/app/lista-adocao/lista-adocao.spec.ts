import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdocao } from './lista-adocao';

describe('ListaAdocao', () => {
  let component: ListaAdocao;
  let fixture: ComponentFixture<ListaAdocao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAdocao],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAdocao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
