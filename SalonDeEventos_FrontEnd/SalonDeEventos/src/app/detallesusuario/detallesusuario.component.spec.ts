import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesusuarioComponent } from './detallesusuario.component';

describe('DetallesusuarioComponent', () => {
  let component: DetallesusuarioComponent;
  let fixture: ComponentFixture<DetallesusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesusuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
