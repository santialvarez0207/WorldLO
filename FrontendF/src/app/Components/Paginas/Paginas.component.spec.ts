import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Paginascomponent } from './Paginas.component';

describe('UsuariosComponent', () => {
  let component:  Paginascomponent;
  let fixture: ComponentFixture< Paginascomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  Paginascomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paginascomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
