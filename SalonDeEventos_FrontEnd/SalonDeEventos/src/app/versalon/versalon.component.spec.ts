import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersalonComponent } from './versalon.component';

describe('VersalonComponent', () => {
  let component: VersalonComponent;
  let fixture: ComponentFixture<VersalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersalonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
