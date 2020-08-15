import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Explorarcomponent } from './Explorar.component';

describe('UsuariosComponent', () => {
  let component:  Explorarcomponent;
  let fixture: ComponentFixture< Explorarcomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  Explorarcomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Explorarcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
