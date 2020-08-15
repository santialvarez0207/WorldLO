import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gcreatecomponent } from './Gcreate.component';

describe('UsuariosComponent', () => {
  let component:  Gcreatecomponent;
  let fixture: ComponentFixture< Gcreatecomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  Gcreatecomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gcreatecomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
