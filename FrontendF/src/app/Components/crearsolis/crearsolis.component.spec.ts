import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearsolisComponent } from './crearsolis.component';

describe('CrearsolisComponent', () => {
  let component: CrearsolisComponent;
  let fixture: ComponentFixture<CrearsolisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearsolisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearsolisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
