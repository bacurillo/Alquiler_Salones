import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionreservasComponent } from './gestionreservas.component';

describe('GestionreservasComponent', () => {
  let component: GestionreservasComponent;
  let fixture: ComponentFixture<GestionreservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionreservasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionreservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
