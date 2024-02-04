import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacotizacionesComponent } from './listacotizaciones.component';

describe('ListacotizacionesComponent', () => {
  let component: ListacotizacionesComponent;
  let fixture: ComponentFixture<ListacotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListacotizacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListacotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
