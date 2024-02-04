import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistasalonesComponent } from './vistasalones.component';

describe('VistasalonesComponent', () => {
  let component: VistasalonesComponent;
  let fixture: ComponentFixture<VistasalonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistasalonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistasalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
