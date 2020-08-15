import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Creacioncomponent } from './Creacion.component';

describe('UsuariosComponent', () => {
  let component:  Creacioncomponent;
  let fixture: ComponentFixture< Creacioncomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  Creacioncomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Creacioncomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
