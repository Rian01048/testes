import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPerdidos } from './lista-perdidos';

describe('ListaPerdidos', () => {
  let component: ListaPerdidos;
  let fixture: ComponentFixture<ListaPerdidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPerdidos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPerdidos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
