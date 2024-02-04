import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesalonComponent } from './detallesalon.component';

describe('DetallesalonComponent', () => {
  let component: DetallesalonComponent;
  let fixture: ComponentFixture<DetallesalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesalonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
