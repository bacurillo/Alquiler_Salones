import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioncotizacionesComponent } from './gestioncotizaciones.component';

describe('GestioncotizacionesComponent', () => {
  let component: GestioncotizacionesComponent;
  let fixture: ComponentFixture<GestioncotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioncotizacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestioncotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
