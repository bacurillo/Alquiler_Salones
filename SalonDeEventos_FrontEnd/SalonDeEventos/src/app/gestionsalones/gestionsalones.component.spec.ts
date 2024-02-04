import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionsalonesComponent } from './gestionsalones.component';

describe('GestionsalonesComponent', () => {
  let component: GestionsalonesComponent;
  let fixture: ComponentFixture<GestionsalonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionsalonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionsalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
