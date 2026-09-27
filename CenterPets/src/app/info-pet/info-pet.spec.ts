import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPet } from './info-pet';

describe('InfoPet', () => {
  let component: InfoPet;
  let fixture: ComponentFixture<InfoPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPet],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoPet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
