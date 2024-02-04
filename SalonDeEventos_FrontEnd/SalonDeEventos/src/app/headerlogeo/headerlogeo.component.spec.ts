import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderlogeoComponent } from './headerlogeo.component';

describe('HeaderlogeoComponent', () => {
  let component: HeaderlogeoComponent;
  let fixture: ComponentFixture<HeaderlogeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderlogeoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderlogeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
